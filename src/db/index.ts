import path from 'path'
import _max from 'lodash/max'
import _isDate from 'lodash/isDate'
import { promises as fs } from 'fs'
import _isEmpty from 'lodash/isEmpty'
import _isNumber from 'lodash/isNumber'
import _isString from 'lodash/isString'
import _isUndefined from 'lodash/isUndefined'

import log from '../log'
import * as U from '../utils'
import * as CONFIG from '../config'
import convertJSONDB from './convert_json_db'
import migrateJSONDBToVersionTwo from './migrate_json_db_to_version_two'
import { TEST_DB_PATH, DB_PATH, DEFAULT_SHEET_NAME } from '../config'
import {
  type TimeSheet,
  type TimeTrackerDB,
  type TimeSheetEntry,
  type JSONTimeTrackerDB
} from '../types'

const { DB_VERSION } = CONFIG
const { NODE_ENV } = process.env
const DEFAULT_DB_PATH = NODE_ENV === 'test' ? TEST_DB_PATH : DB_PATH

// TODO: Extract
interface AddActiveSheetEntryArgs {
  sheet: TimeSheet | string
  input?: string
  description?: string
  startDate?: Date
  tags?: string[]
}

class DB {
  db: TimeTrackerDB | null
  dbPath: string

  static genDB(): TimeTrackerDB {
    return {
      version: DB_VERSION,
      sheets: [DB.genSheet(DEFAULT_SHEET_NAME)],
      activeSheetName: DEFAULT_SHEET_NAME
    } as TimeTrackerDB
  }

  static genSheet(
    name: string,
    entries: TimeSheetEntry[] = [],
    activeEntryID: number | null = null
  ) {
    if (_isEmpty(name)) {
      throw new Error('New sheet name must not be empty')
    } else if (
      activeEntryID !== null &&
      _isUndefined(entries.find(({ id }) => id === activeEntryID))
    ) {
      throw new Error('New sheet active entry does not exist')
    }

    return {
      name,
      entries,
      activeEntryID
    }
  }

  static genSheetEntry(
    id: number,
    description: string,
    start?: Date,
    end?: Date | null,
    tags?: string[]
  ): TimeSheetEntry {
    return {
      id,
      description,
      end: end ?? null,
      start: start ?? new Date(),
      tags: tags ?? []
    }
  }

  constructor(dbPath: string = DEFAULT_DB_PATH) {
    if (_isEmpty(dbPath)) {
      throw new Error('DB path required')
    } else if (path.extname(dbPath) !== '.json') {
      throw new Error('File at DB path must be JSON')
    }

    this.db = null
    this.dbPath = dbPath
  }

  _parseSheetArg(sheetArg: TimeSheet | string) {
    return _isString(sheetArg) ? this.getSheet(sheetArg) : sheetArg
  }

  _parseEntryIDArg(entryArg: TimeSheetEntry | number) {
    return _isNumber(entryArg) ? entryArg : entryArg.id
  }

  async doesDBExist(): Promise<boolean> {
    try {
      await fs.access(this.dbPath)
      return true
    } catch (err: unknown) {
      return false
    }
  }

  async delete(): Promise<void> {
    try {
      await fs.unlink(this.dbPath)
    } catch (err: any) {
      if (NODE_ENV !== 'test') {
        throw new Error(`Failed to delete DB: ${err}`)
      }
    }
  }

  async load(): Promise<void> {
    const dbPathDir = path.dirname(this.dbPath)
    await U.ensureDirExists(dbPathDir)
    const dbExists = await this.doesDBExist()

    if (!dbExists) {
      this.db = DB.genDB()
      await this.save()
    } else {
      const dbJSON = await fs.readFile(this.dbPath, 'utf-8')
      let jsonDB: JSONTimeTrackerDB = {} as JSONTimeTrackerDB

      try {
        jsonDB = JSON.parse(dbJSON)
      } catch (err: any) {
        throw new Error(`DB at ${this.dbPath} is invalid JSON: ${err}`)
      }

      let didMigrate = false

      // TODO: Handle an arbitrary number of migrations between multiple
      //       versions.
      if (jsonDB.version === 1 || _isUndefined(jsonDB.version)) {
        jsonDB = migrateJSONDBToVersionTwo(jsonDB)
        didMigrate = true

        log('Migrated DB to version 2')
      } else if (jsonDB.version > DB_VERSION || jsonDB.version < 1) {
        throw new Error(`Unknown DB version ${jsonDB.version}, cannot load.`)
      }

      this.db = convertJSONDB(jsonDB)

      if (didMigrate) {
        await this.save()
      }
    }
  }

  async save(): Promise<void> {
    if (this.db === null) {
      throw new Error('DB not loaded')
    }

    const dbJSON = JSON.stringify(this.db)

    try {
      await fs.writeFile(this.dbPath, dbJSON)
    } catch (err: any) {
      throw new Error(`Failed to save DB: ${err}`)
    }
  }

  getActiveSheetName(): string | null {
    if (this.db === null) {
      throw new Error('DB not loaded')
    }

    return this.db.activeSheetName
  }

  async setActiveSheetName(sheetName: string | null): Promise<void> {
    if (this.db === null) {
      throw new Error('DB not loaded')
    }

    this.db.activeSheetName = sheetName

    await this.save()
  }

  getActiveSheet(): TimeSheet {
    if (this.db === null) {
      throw new Error('DB not loaded')
    }

    const activeSheetName = this.getActiveSheetName()

    if (activeSheetName === null) {
      throw new Error('No active sheet')
    }

    return this.getSheet(activeSheetName)
  }

  getMostRecentlyActiveSheet(): TimeSheet {
    if (this.db === null) {
      throw new Error('DB not loaded')
    }

    const { sheets } = this.db
    const results = sheets
      .filter(({ entries }) => !_isEmpty(entries))
      .map(({ name, entries }) => ({
        name,
        maxStart: _max(entries.map(({ start }) => +start)) ?? Date.now()
      }))

    if (results.length === 0) {
      throw new Error('No active sheets found')
    }

    results.sort(({ maxStart: a }, { maxStart: b }) => +b - +a)

    const [lastActiveResult] = results
    const { name } = lastActiveResult

    return this.getSheet(name)
  }

  doesSheetExist(sheetName: string): boolean {
    if (this.db === null) {
      throw new Error('DB not loaded')
    }

    const { sheets } = this.db

    return !_isUndefined(sheets.find(({ name }) => name === sheetName))
  }

  async setActiveSheet(sheet: TimeSheet | string): Promise<void> {
    if (this.db === null) {
      throw new Error('DB not loaded')
    }

    const targetSheet = this._parseSheetArg(sheet)
    const { name } = targetSheet

    this.db.activeSheetName = name

    await this.save()
  }

  async addSheet(
    sheetName: string,
    entries: TimeSheetEntry[] = [],
    activeEntryID: number | null = null
  ): Promise<TimeSheet> {
    if (this.db === null) {
      throw new Error('DB not loaded')
    }

    const sheet = DB.genSheet(sheetName, entries, activeEntryID)

    this.db.sheets.push(sheet)

    await this.save()

    return sheet
  }

  getSheet(sheetName: string): TimeSheet {
    if (this.db === null) {
      throw new Error('DB not loaded')
    }

    const { sheets } = this.db
    const sheet = sheets.find(({ name }) => name === sheetName)

    if (_isUndefined(sheet)) {
      throw new Error(`Sheet ${sheetName} not found`)
    }

    return sheet
  }

  getAllSheets(): TimeSheet[] {
    if (this.db === null) {
      throw new Error('DB not loaded')
    }

    return this.db.sheets
  }

  getMostRecentlyActiveSheetEntry(sheet: TimeSheet | string): TimeSheetEntry {
    if (this.db === null) {
      throw new Error('DB not loaded')
    }

    const targetSheet = this._parseSheetArg(sheet)
    const { name, entries: sheetEntries } = targetSheet

    if (_isEmpty(sheetEntries)) {
      throw new Error(`No entries found in sheet ${name}`)
    }

    const entries = [...sheetEntries]

    entries.sort(({ start: a }, { start: b }) => +b - +a)

    if (_isUndefined(entries[0])) {
      throw new Error(`No entries found in sheet ${name}`)
    }

    return entries[0]
  }

  async removeSheet(sheetName: string): Promise<void> {
    if (this.db === null) {
      throw new Error('DB not loaded')
    }

    const { sheets } = this.db
    const sheetIndex = sheets.findIndex(({ name }) => name === sheetName)

    if (sheetIndex === -1) {
      throw new Error(`Sheet ${sheetName} not found`)
    }

    const sheet = sheets[sheetIndex]
    const { name: removedSheetName } = sheet

    if (this.getActiveSheetName() === removedSheetName) {
      await this.setActiveSheetName(null)
    }

    sheets.splice(sheetIndex, 1)

    await this.save()
  }

  async renameSheet(oldName: string, newName: string): Promise<void> {
    if (this.db === null) {
      throw new Error('DB not loaded')
    }

    const sheet = this.getSheet(oldName)

    sheet.name = newName

    await this.save()
  }

  getSheetEntry(
    sheet: TimeSheet | string,
    entry: TimeSheetEntry | number
  ): TimeSheetEntry {
    if (this.db === null) {
      throw new Error('DB not loaded')
    }

    const targetSheet = this._parseSheetArg(sheet)
    const targetEntryID = this._parseEntryIDArg(entry)
    const { name, entries } = targetSheet
    const result = entries.find(({ id }) => id === targetEntryID)

    if (_isUndefined(result)) {
      throw new Error(`Entry ${targetEntryID} not found in sheet ${name}`)
    }

    return result
  }

  async checkOutOfSheetEntry(
    sheet: TimeSheet | string,
    entry: TimeSheetEntry | number,
    endDate?: Date
  ): Promise<void> {
    if (this.db === null) {
      throw new Error('DB not loaded')
    }

    const targetSheet = this._parseSheetArg(sheet)
    const targetEntry = this.getSheetEntry(sheet, entry)
    const finalEndDate = _isDate(endDate) ? endDate : new Date()

    targetEntry.end = finalEndDate
    targetSheet.activeEntryID = null

    await this.save()
  }

  async removeSheetEntry(
    sheet: TimeSheet | string,
    entry: TimeSheetEntry | number
  ): Promise<void> {
    if (this.db === null) {
      throw new Error('DB not loaded')
    }

    const entryID = this._parseEntryIDArg(entry)
    const targetSheet = this._parseSheetArg(sheet)
    const { name: sheetName, entries } = targetSheet
    const entryIndex = entries.findIndex(({ id }) => id === entryID)

    if (entryIndex === -1) {
      throw new Error(`Entry ${entryID} not found in sheet ${sheetName}`)
    }

    entries.splice(entryIndex, 1)

    await this.save()
  }

  async addActiveSheetEntry(
    args: AddActiveSheetEntryArgs
  ): Promise<TimeSheetEntry> {
    if (this.db === null) {
      throw new Error('DB not loaded')
    }

    const {
      description: descriptionArg,
      sheet,
      input,
      tags: tagsArg,
      startDate
    } = args

    const targetSheet = this._parseSheetArg(sheet)
    const { entries } = targetSheet
    const id = entries.length
    const start = startDate ?? new Date()
    const end = null

    let description = descriptionArg as string
    let tags: string[] = tagsArg ?? []

    if (_isEmpty(tags) && !_isUndefined(input)) {
      const res = U.parseEntryFromInput(id, input, start)

      tags = res.tags
      description = res.description
    }

    const entry = DB.genSheetEntry(id, description, start, end, tags)

    entries.push(entry)
    targetSheet.activeEntryID = id

    await this.save()

    return entry
  }
}

export default DB
