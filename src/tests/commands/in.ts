/* eslint-env mocha */

import { type Argv } from 'yargs'
import chai, { expect } from 'chai'
import _cloneDeep from 'lodash/cloneDeep'
import chaiAsPromised from 'chai-as-promised'

import DB from '../../db'
import getTestDB from '../get_test_db'
import { type InCommandArgs, handler } from '../../commands/in'

chai.use(chaiAsPromised)

const db = getTestDB()

const getArgs = (overrides?: Record<string, unknown>): InCommandArgs => ({
  db,
  yargs: {} as Argv,
  description: [],
  ...(overrides ?? {})
})

describe('commands:in:handler', function () {
  beforeEach(async function () {
    await db.load()
  })

  afterEach(async function () {
    await db.delete()
  })

  it('throws an error if not provided a sheet name and no sheet is active', function () {
    const p = handler(getArgs())

    expect(p).to.be.rejectedWith('No active sheet')
  })

  it('throws an error if the sheet has an active entry registered but it is not in the entries list', function () {
    const testDB = _cloneDeep(db)
    const sheet = DB.genSheet('test-sheet')

    sheet.activeEntryID = 42

    testDB?.db?.sheets.push(sheet)

    const p = handler(getArgs({ db: testDB }))

    expect(p).to.be.rejectedWith('Sheet test-sheet has no entry with ID 42')
  })

  it('throws an error if an entry is already active for the time sheet', function () {
    const entry = DB.genSheetEntry(0, 'test-description', new Date())
    const sheet = DB.genSheet('test-sheet', [entry], entry.id)

    db.db?.sheets.push(sheet)

    const p = handler(getArgs({ db }))

    expect(p).to.be.rejectedWith(
      `An entry is already active (${entry.id}): ${entry.description}`
    )
  })

  it('creates a new time sheet entry and adds it to the sheet entry list', function (done) {
    const sheet = DB.genSheet('test-sheet')
    const { name } = sheet
    const testDB = _cloneDeep(db)

    if (testDB.db === null) {
      throw new Error('Test DB is null')
    }

    testDB.db.sheets.push(sheet)
    testDB.db.activeSheetName = name

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
