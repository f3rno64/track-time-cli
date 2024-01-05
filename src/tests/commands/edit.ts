/* eslint-env mocha */

import { type Argv } from 'yargs'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'

import DB from '../../db'
import getTestDB from '../get_test_db'
import { type EditCommandArgs, handler } from '../../commands/edit'

chai.use(chaiAsPromised)

const db = getTestDB()

const getArgs = (overrides?: Record<string, unknown>): EditCommandArgs => ({
  db,
  yargs: {} as Argv,
  delete: false,
  ...(overrides ?? {})
})

describe('commands:edit:handler', function () {
  beforeEach(async function () {
    await db.load()
  })

  afterEach(async function () {
    await db.delete()
  })

  it('throws an error if no sheet or entry is specified', async function () {
    const p = handler(getArgs())

    chai.expect(p).to.be.rejectedWith('No sheet or entry specified')
  })

  it('throws an error if the specified sheet does not exist', function () {
    const sheetA = DB.genSheet('test-sheet-a')
    const sheetB = DB.genSheet('test-sheet-b')

    db.db?.sheets.push(sheetA)
    db.db?.sheets.push(sheetB)

    const p = handler(getArgs({ sheet: 'test-sheet-c' }))

    chai.expect(p).to.be.rejectedWith('Sheet test-sheet-c not found')
  })

  it('throws an error if the specified sheet entry does not exist', function () {
    const entryA = DB.genSheetEntry(0, 'test-entry-a')
    const entryB = DB.genSheetEntry(1, 'test-entry-b')
    const sheet = DB.genSheet('test-sheet', [entryA, entryB])

    db.db?.sheets.push(sheet)

    const p = handler(getArgs({ entry: 42 }))

    chai.expect(p).to.be.rejectedWith('Entry 42 not found in sheet test-sheet')
  })

  it('throws an error if editing a sheet but no name was provided', function () {
    const sheetA = DB.genSheet('test-sheet-a')
    const sheetB = DB.genSheet('test-sheet-b')

    db.db?.sheets.push(sheetA)
    db.db?.sheets.push(sheetB)

    const p = handler(getArgs({ sheet: 'test-sheet-a', name: undefined }))

    chai.expect(p).to.be.rejectedWith('No new name specified')
  })

  it('edits the name of the specified sheet', async function () {
    const sheet = DB.genSheet('test-sheet-a')

    db.db?.sheets.push(sheet)

    await handler(getArgs({ sheet: 'test-sheet-a', name: 'new-name' }))

    expect(sheet.name).to.equal('new-name')
  })

  it('edits the description of the specified sheet entry', async function () {
    const entry = DB.genSheetEntry(0, 'test-description')
    const sheet = DB.genSheet('test-sheet-a', [entry])

    db.db?.sheets.push(sheet)

    await handler(
      getArgs({
        sheet: 'test-sheet-a',
        entry: 0,
        description: 'new-description'
      })
    )

    expect(sheet.entries[0]).to.not.be.undefined
    expect(sheet.entries[0].description).to.equal('new-description')
  })

  it('edits the start date of the specified sheet entry', async function () {
    const startDate = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const newStartDate = new Date()
    const entry = DB.genSheetEntry(0, 'test-description', startDate)
    const sheet = DB.genSheet('test-sheet-a', [entry])

    db.db?.sheets.push(sheet)

    await handler(
      getArgs({
        sheet: 'test-sheet-a',
        entry: 0,
        start: newStartDate.toISOString()
      })
    )

    expect(+entry.start).to.equal(+newStartDate)
  })

  it('edits the end date of the specified sheet entry', async function () {
    const startDate = new Date(Date.now() - 48 * 60 * 60 * 1000)
    const endDate = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const newEndDate = new Date()
    const entry = DB.genSheetEntry(0, 'test-description', startDate, endDate)
    const sheet = DB.genSheet('test-sheet-a', [entry])

    db.db?.sheets.push(sheet)

    await handler(
      getArgs({
        sheet: 'test-sheet-a',
        entry: 0,
        end: newEndDate.toISOString()
      })
    )

    expect(+(entry.end === null ? 0 : entry.end)).to.equal(+newEndDate)
  })

  it('deletes the specified sheet if requested', async function () {
    const sheetA = DB.genSheet('test-sheet-a')
    const sheetB = DB.genSheet('test-sheet-b')

    db.db?.sheets.push(sheetA)
    db.db?.sheets.push(sheetB)

    await handler(getArgs({ sheet: 'test-sheet-a', delete: true }))

    expect(db.db?.sheets.find(({ name }) => name === 'test-sheet-a')).to.be
      .undefined
  })

  it('deletes the specified sheet entry if requested', async function () {
    const entryA = DB.genSheetEntry(0, 'test-entry-a')
    const entryB = DB.genSheetEntry(1, 'test-entry-b')
    const sheet = DB.genSheet('test-sheet-a', [entryA, entryB])

    db.db?.sheets.push(sheet)

    await handler(
      getArgs({
        sheet: 'test-sheet-a',
        entry: 1,
        delete: true
      })
    )

    expect(sheet.entries.find(({ id }) => id === 1)).to.be.undefined
  })
})
