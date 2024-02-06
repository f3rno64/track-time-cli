/* eslint-env mocha */

import { type Argv } from 'yargs'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'

import DB from '../../db'
import getTestDB from '../get_test_db'
import { type SheetCommandArgs, handler } from '../../commands/sheet'

chai.use(chaiAsPromised)

const db = getTestDB()
const getArgs = (overrides?: Record<string, unknown>): SheetCommandArgs => ({
  db,
  yargs: {} as Argv,
  ...(overrides ?? {})
})

describe('commands:sheet:handler', function () {
  this.timeout(10 * 1000)

  beforeEach(async function () {
    await db.load()
  })

  afterEach(async function () {
    await db.delete()
  })

  it('throws an error if trying to delete a sheet that does not exist', async function () {
    const sheetName = 'non-existent-sheet'
    const p = handler(getArgs({ delete: true, name: sheetName }))

    await expect(p).to.be.rejectedWith(`Sheet ${sheetName} not found`)
  })

  it('removes specified sheet from the DB if it exists', async function () {
    const sheetNameA = 'test-sheet-a'
    const sheetNameB = 'test-sheet-b'
    const sheetA = DB.genSheet(sheetNameA)
    const sheetB = DB.genSheet(sheetNameB)

    db.db?.sheets.push(sheetA)
    db.db?.sheets.push(sheetB)

    await handler(getArgs({ delete: true, name: sheetNameA }))

    expect(db.db?.sheets.length).to.equal(2)
    expect(db.db?.sheets.find(({ name }) => name === sheetNameA)).to.be
      .undefined
  })

  it('throws an error if no name is given', async function () {
    if (db.db === null) {
      throw new Error('Test DB is null')
    }

    db.db.activeSheetName = null

    const p = handler(getArgs({ delete: false, name: '' }))

    await expect(p).to.be.rejectedWith('New sheet name must not be empty')
  })

  it('throws an error if the specified sheet is already active', async function () {
    const p = handler(getArgs({ delete: false, name: 'main' }))

    await expect(p).to.be.rejectedWith('Sheet main already active')
  })

  it('switches to the specified sheet', async function () {
    const sheetNameA = 'test-sheet-a'
    const sheetNameB = 'test-sheet-b'
    const sheetA = DB.genSheet(sheetNameA)
    const sheetB = DB.genSheet(sheetNameB)

    db.db?.sheets.push(sheetA)
    db.db?.sheets.push(sheetB)

    await handler(getArgs({ delete: false, name: sheetNameA }))

    expect(db.getActiveSheetName()).to.equal(sheetNameA)
  })

  it('creates a new sheet with the name if it does not exist', async function () {
    const sheetNameA = 'test-sheet-a'
    const sheetNameB = 'test-sheet-b'
    const sheetNameC = 'test-sheet-c'
    const sheetA = DB.genSheet(sheetNameA)
    const sheetB = DB.genSheet(sheetNameB)

    db.db?.sheets.push(sheetA)
    db.db?.sheets.push(sheetB)

    await handler(getArgs({ delete: false, name: sheetNameC }))

    const sheets = db.getAllSheets()
    const newSheet = sheets.find(({ name }) => name === sheetNameC)

    expect(db.getActiveSheetName()).to.equal(sheetNameC)
    expect(newSheet?.name).to.equal(sheetNameC)
    expect(newSheet?.activeEntryID).to.be.null
    expect(newSheet?.entries).to.be.empty
  })
})
