/* eslint-env mocha */

import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'

import { genSheet } from '../../sheets'
import { deleteDB, initDB } from '../../db'
import { handler } from '../../commands/sheet'
import { type TimeTrackerDB } from '../../types'

chai.use(chaiAsPromised)

let db: TimeTrackerDB = {} as unknown as TimeTrackerDB

describe('commands:sheet:handler', () => {
  beforeEach(async () => {
    db = await initDB()
  })

  afterEach(async () => {
    await deleteDB()
    db = {} as unknown as TimeTrackerDB
  })

  it('throws an error if trying to delete a sheet that does not exist', () => {
    const sheetName = 'non-existent-sheet'
    const p = handler({ db, name: sheetName, delete: true })

    expect(p).to.be.rejectedWith(`Sheet ${sheetName} does not exist`)
  })

  it('removes specified sheet from the DB if it exists', async () => {
    const sheetNameA = 'test-sheet-a'
    const sheetNameB = 'test-sheet-b'
    const sheetA = genSheet(sheetNameA)
    const sheetB = genSheet(sheetNameB)

    db.sheets.push(sheetA)
    db.sheets.push(sheetB)

    await handler({ db, name: sheetNameA, delete: true })

    expect(db.sheets.length).to.equal(2)
    expect(db.sheets.find(({ name }) => name === sheetNameA)).to.be.undefined
  })

  it('throws an error if no name is given and no active sheet exists', () => {
    db.activeSheetName = null

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
    const sheetA = genSheet(sheetNameA)
    const sheetB = genSheet(sheetNameB)

    db.sheets.push(sheetA)
    db.sheets.push(sheetB)

    await handler({ db, name: sheetNameA, delete: false })

    const { activeSheetName } = db

    expect(activeSheetName).to.equal(sheetNameA)
  })

  it('creates a new sheet with the name if it does not exist', async () => {
    const sheetNameA = 'test-sheet-a'
    const sheetNameB = 'test-sheet-b'
    const sheetNameC = 'test-sheet-c'
    const sheetA = genSheet(sheetNameA)
    const sheetB = genSheet(sheetNameB)

    db.sheets.push(sheetA)
    db.sheets.push(sheetB)

    await handler({ db, name: sheetNameC, delete: false })

    const { activeSheetName, sheets } = db
    const newSheet = sheets.find(({ name }) => name === sheetNameC)

    expect(activeSheetName).to.equal(sheetNameC)
    expect(newSheet?.name).to.equal(sheetNameC)
    expect(newSheet?.activeEntryID).to.be.null
    expect(newSheet?.entries).to.be.empty
  })
})
