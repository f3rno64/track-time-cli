/* eslint-env mocha */

import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'

import DB from '../../db'
import { handler } from '../../commands/sheet'

chai.use(chaiAsPromised)

const db = new DB()

describe('commands:sheet:handler', () => {
  beforeEach(async () => {
    await db.load()
  })

  afterEach(async () => {
    await db.delete()
  })

  it('throws an error if trying to delete a sheet that does not exist', () => {
    const sheetName = 'non-existent-sheet'
    const p = handler({ db, name: sheetName, delete: true })

    expect(p).to.be.rejectedWith(`Sheet ${sheetName} does not exist`)
  })

  it('removes specified sheet from the DB if it exists', async () => {
    const sheetNameA = 'test-sheet-a'
    const sheetNameB = 'test-sheet-b'
    const sheetA = DB.genSheet(sheetNameA)
    const sheetB = DB.genSheet(sheetNameB)

    db.db?.sheets.push(sheetA)
    db.db?.sheets.push(sheetB)

    await handler({ db, name: sheetNameA, delete: true })

    expect(db.db?.sheets.length).to.equal(2)
    expect(db.db?.sheets.find(({ name }) => name === sheetNameA)).to.be
      .undefined
  })

  it('throws an error if no name is given and no active sheet exists', () => {
    if (db.db === null) {
      throw new Error('Test DB is null')
    }

    db.db.activeSheetName = null

    const p = handler({ db, name: '', delete: false })

    expect(p).to.be.rejectedWith('No active time sheet')
  })

  it('throws an error if the specified sheet is already active', () => {
    const p = handler({ db, name: 'main', delete: false })

    expect(p).to.be.rejectedWith('Sheet main already active')
  })

  it('switches to the specified sheet', async () => {
    const sheetNameA = 'test-sheet-a'
    const sheetNameB = 'test-sheet-b'
    const sheetA = DB.genSheet(sheetNameA)
    const sheetB = DB.genSheet(sheetNameB)

    db.db?.sheets.push(sheetA)
    db.db?.sheets.push(sheetB)

    await handler({ db, name: sheetNameA, delete: false })

    expect(db.getActiveSheetName()).to.equal(sheetNameA)
  })

  it('creates a new sheet with the name if it does not exist', async () => {
    const sheetNameA = 'test-sheet-a'
    const sheetNameB = 'test-sheet-b'
    const sheetNameC = 'test-sheet-c'
    const sheetA = DB.genSheet(sheetNameA)
    const sheetB = DB.genSheet(sheetNameB)

    db.db?.sheets.push(sheetA)
    db.db?.sheets.push(sheetB)

    await handler({ db, name: sheetNameC, delete: false })

    const sheets = db.getAllSheets()
    const newSheet = sheets.find(({ name }) => name === sheetNameC)

    expect(db.getActiveSheetName()).to.equal(sheetNameC)
    expect(newSheet?.name).to.equal(sheetNameC)
    expect(newSheet?.activeEntryID).to.be.null
    expect(newSheet?.entries).to.be.empty
  })
})
