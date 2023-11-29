import _max from 'lodash/max'
import _isFinite from 'lodash/isFinite'

import * as U from '../utils'
import * as C from '../color'
import { genEntry } from '../sheets'
import { saveDB, findSheet } from '../db'
import { type TimeTrackerDB, type TimeSheetEntry, TimeSheet } from '../types'

const COMMAND_CONFIG = {
  command: 'resume',
  describe: 'Resume the last active entry',
  alias: 'r'
}

interface ResumeCommandArgs {
  db: TimeTrackerDB
}

const findLastActiveSheetEntry = (sheet: TimeSheet): TimeSheetEntry | null => {
  const { entries: sheetEntries } = sheet
  const entries = [...sheetEntries]

  entries.sort(({ start: a }, { start: b }) => +b - +a)

  return entries[0] ?? null
}

const findLastActiveSheet = (db: TimeTrackerDB): TimeSheet | null => {
  const { sheets } = db
  const results = sheets.map(({ name, entries }) => ({
    name,
    maxStart: _max(entries.map(({ start }) => +start))
  }))

  results.sort(({ maxStart: a }, { maxStart: b }) => +b - +a)

  const [lastActiveResult] = results
  const { name } = lastActiveResult

  return findSheet(db, name)
}

const handler = async (args: ResumeCommandArgs) => {
  const { db } = args
  const lastActiveSheet = findLastActiveSheet(db)

  if (lastActiveSheet === null) {
    console.log(C.clError('No recent active sheet'))
    return
  }

  const { name } = lastActiveSheet
  const lastActiveEntry = findLastActiveSheetEntry(lastActiveSheet)

  if (lastActiveEntry === null) {
    console.log(`${C.clError('No recent entry for sheet')} ${C.clSheet(name)}`)
    return
  }

  const { id, end } = lastActiveEntry

  if (_isFinite(end)) {
    console.log(
      `${C.clText('Sheet')} ${C.clSheet(name)} ${C.clText(
        'already has an active entry'
      )}`
    )
    return
  }

  const { description } = lastActiveEntry
  const newEntryID = id + 1
  const newEntry = genEntry(newEntryID, description)

  lastActiveSheet.entries.push(newEntry)
  lastActiveSheet.activeEntryID = newEntryID

  await saveDB(db)

  console.log(
    `${C.clSheet(`[sheet ${name}]`)} ${C.clText('Resumed entry')} ${C.clID(
      `(${newEntryID})`
    )} ${C.clHighlight(description)}`
  )
}

export default {
  ...COMMAND_CONFIG,
  handler: U.cmdHandler(handler)
}
