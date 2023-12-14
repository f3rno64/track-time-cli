/* eslint-env mocha */

import chai, { expect } from 'chai'
import _cloneDeep from 'lodash/cloneDeep'
import chaiAsPromised from 'chai-as-promised'

import { deleteDB, initDB } from '../../db'
import { type TimeTrackerDB } from '../../types'
import { genSheet, genSheetEntry } from '../../sheets'
import { type InCommandArgs, handler } from '../../commands/in'

chai.use(chaiAsPromised)

let db: TimeTrackerDB = {} as unknown as TimeTrackerDB

const getArgs = (overrides?: Record<string, unknown>): InCommandArgs => ({
  db,
  description: [],
  ...(overrides ?? {})
})

describe('commands:in:handler', () => {
  beforeEach(async () => {
    db = await initDB()
  })

  afterEach(async () => {
    await deleteDB()
    db = {} as unknown as TimeTrackerDB
  })

  it('throws an error if not provided a sheet name and no sheet is active', () => {
    const p = handler(getArgs())

    expect(p).to.be.rejectedWith('No active sheet')
  })

  it('throws an error if the sheet has an active entry registered but it is not in the entries list', () => {
    const testDB = _cloneDeep(db)
    const sheet = genSheet('test-sheet')

    sheet.activeEntryID = 42

    testDB.sheets.push(sheet)

    const p = handler(getArgs({ db: testDB }))

    expect(p).to.be.rejectedWith('Sheet test-sheet has no entry with ID 42')
  })

  it('throws an error if an entry is already active for the time sheet', () => {
    const entry = genSheetEntry(0, 'test-description', new Date())
    const sheet = genSheet('test-sheet', [entry], entry.id)

    db.sheets.push(sheet)

    const p = handler(getArgs({ db }))

    expect(p).to.be.rejectedWith(
      `An entry is already active (${entry.id}): ${entry.description}`
    )
  })

  it('creates a new time sheet entry and adds it to the sheet entry list', (done) => {
    const sheet = genSheet('test-sheet')
    const { name } = sheet
    const testDB = _cloneDeep(db)

    testDB.sheets.push(sheet)
    testDB.activeSheetName = name

    const atDate = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const p = handler(
      getArgs({
        db: testDB,
        at: atDate.toISOString(),
        sheet: name,
        description: ['test', 'description']
      })
    )

    expect(p).to.be.fulfilled.then(() => {
      const { entries } = sheet
      const [entry] = entries

      expect(entry.id).to.equal(0)
      expect(+entry.start).to.equal(+atDate)
      expect(entry.end).to.equal(null)
      expect(entry.description).to.equal('test description')

      done()
    })
  })
})
