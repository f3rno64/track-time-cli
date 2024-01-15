/* eslint-env mocha */

import { type Argv } from 'yargs'
import _last from 'lodash/last'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'

import DB from '../../db'
import getTestDB from '../get_test_db'
import { type TimeSheetEntry } from '../../types'
import { type ResumeCommandArgs, handler } from '../../commands/resume'

chai.use(chaiAsPromised)

const db = getTestDB()
const getArgs = (overrides?: Record<string, unknown>): ResumeCommandArgs => ({
  db,
  yargs: {} as Argv,
  ...(overrides ?? {})
})

describe('commands:resume:handler', function () {
  this.timeout(10 * 1000)

  beforeEach(async function () {
    await db.load()
  })

  afterEach(async function () {
    await db.delete()
  })

  it('throws an error if there is no active sheet', function () {
    const p = handler(getArgs())

    chai.expect(p).to.be.rejectedWith('No active sheet')
  })

  it('throws an error if there is no recent entry for the active sheet', function () {
    const sheet = DB.genSheet('test-sheet')
    const { name: sheetName } = sheet

    if (db.db === null) {
      throw new Error('Test DB is null')
    }

    db.db.sheets.push(sheet)
    db.db.activeSheetName = sheetName

    const p = handler(getArgs())

    chai.expect(p).to.be.rejectedWith(`No recent entry for sheet ${sheetName}`)
  })

  it('throws an error if the active sheet already has a running entry', function () {
    const entryA = DB.genSheetEntry(0, 'test-a', new Date(), new Date())
    const entryB = DB.genSheetEntry(0, 'test-b', new Date())
    const sheet = DB.genSheet('test-sheet', [entryA, entryB], entryB.id)
    const { name: sheetName } = sheet

    if (db.db === null) {
      throw new Error('Test DB is null')
    }

    db.db.sheets.push(sheet)
    db.db.activeSheetName = sheetName

    const p = handler(getArgs())

    chai
      .expect(p)
      .to.be.rejectedWith(
        `Sheet ${sheetName} already has an active entry (${entryB.id}: ${entryB.description})`
      )
  })

  it('creates a new entry with the same description as the most recently ended entry and adds it to the sheet', function (done) {
    const entryA = DB.genSheetEntry(0, 'test-a', new Date(), new Date())
    const entryB = DB.genSheetEntry(
      0,
      'test-b',
      new Date(Date.now() + 1000),
      new Date(Date.now() + 100000)
    )
    const sheet = DB.genSheet('test-sheet', [entryA, entryB])
    const { name: sheetName } = sheet

    if (db.db === null) {
      throw new Error('Test DB is null')
    }

    db.db.sheets.push(sheet)
    db.db.activeSheetName = sheetName

    handler(getArgs()).then(() => {
      const { activeEntryID } = sheet
      const newEntry = _last(sheet.entries) as unknown as TimeSheetEntry

      expect(activeEntryID).to.equal(newEntry.id)
      expect(newEntry.description).to.equal(entryB.description)
      expect(+newEntry.start).to.be.closeTo(Date.now(), 1000)
      expect(newEntry.end).to.be.null

      done()
    })
  })
})
