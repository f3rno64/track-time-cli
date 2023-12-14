/* eslint-env mocha */

import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'

import { deleteDB, initDB } from '../../db'
import { type TimeTrackerDB } from '../../types'
import { genSheet, genSheetEntry } from '../../sheets'
import { type EditCommandArguments, handler } from '../../commands/edit'

chai.use(chaiAsPromised)

let db: TimeTrackerDB = {} as unknown as TimeTrackerDB

const getArgs = (
  overrides?: Record<string, unknown>
): EditCommandArguments => ({
  db,
  delete: false,
  ...(overrides ?? {})
})

describe('commands:edit:handler', () => {
  beforeEach(async () => {
    db = await initDB()
  })

  afterEach(async () => {
    await deleteDB()
    db = {} as unknown as TimeTrackerDB
  })

  it('throws an error if no sheet or entry is specified', async () => {
    const p = handler(getArgs())

    chai.expect(p).to.be.rejectedWith('No sheet or entry specified')
  })

  it('throws an error if the specified sheet does not exist', () => {
    const sheetA = genSheet('test-sheet-a')
    const sheetB = genSheet('test-sheet-b')

    db.sheets.push(sheetA)
    db.sheets.push(sheetB)

    const p = handler(getArgs({ sheet: 'test-sheet-c' }))

    chai.expect(p).to.be.rejectedWith('Sheet test-sheet-c not found')
  })

  it('throws an error if the specified sheet entry does not exist', () => {
    const entryA = genSheetEntry(0, 'test-entry-a')
    const entryB = genSheetEntry(1, 'test-entry-b')
    const sheet = genSheet('test-sheet', [entryA, entryB])

    db.sheets.push(sheet)

    const p = handler(getArgs({ entry: 42 }))

    chai.expect(p).to.be.rejectedWith('Entry 42 not found in sheet test-sheet')
  })

  it('throws an error if editing a sheet but no name was provided', () => {
    const sheetA = genSheet('test-sheet-a')
    const sheetB = genSheet('test-sheet-b')

    db.sheets.push(sheetA)
    db.sheets.push(sheetB)

    const p = handler(getArgs({ sheet: 'test-sheet-a', name: undefined }))

    chai.expect(p).to.be.rejectedWith('No new name specified')
  })

  it('edits the name of the specified sheet', async () => {
    const sheet = genSheet('test-sheet-a')

    db.sheets.push(sheet)

    await handler(getArgs({ sheet: 'test-sheet-a', name: 'new-name' }))

    expect(sheet.name).to.equal('new-name')
  })

  it('edits the description of the specified sheet entry', async () => {
    const entry = genSheetEntry(0, 'test-description')
    const sheet = genSheet('test-sheet-a', [entry])

    db.sheets.push(sheet)

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

  it('edits the start date of the specified sheet entry', async () => {
    const startDate = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const newStartDate = new Date()
    const entry = genSheetEntry(0, 'test-description', startDate)
    const sheet = genSheet('test-sheet-a', [entry])

    db.sheets.push(sheet)

    await handler(
      getArgs({
        sheet: 'test-sheet-a',
        entry: 0,
        start: newStartDate.toISOString()
      })
    )

    expect(+entry.start).to.equal(+newStartDate)
  })

  it('edits the end date of the specified sheet entry', async () => {
    const startDate = new Date(Date.now() - 48 * 60 * 60 * 1000)
    const endDate = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const newEndDate = new Date()
    const entry = genSheetEntry(0, 'test-description', startDate, endDate)
    const sheet = genSheet('test-sheet-a', [entry])

    db.sheets.push(sheet)

    await handler(
      getArgs({
        sheet: 'test-sheet-a',
        entry: 0,
        end: newEndDate.toISOString()
      })
    )

    expect(+(entry.end === null ? 0 : entry.end)).to.equal(+newEndDate)
  })

  it('deletes the specified sheet if requested', async () => {
    const sheetA = genSheet('test-sheet-a')
    const sheetB = genSheet('test-sheet-b')

    db.sheets.push(sheetA)
    db.sheets.push(sheetB)

    await handler(getArgs({ sheet: 'test-sheet-a', delete: true }))

    expect(db.sheets.find(({ name }) => name === 'test-sheet-a')).to.be
      .undefined
  })

  it('deletes the specified sheet entry if requested', async () => {
    const entryA = genSheetEntry(0, 'test-entry-a')
    const entryB = genSheetEntry(1, 'test-entry-b')
    const sheet = genSheet('test-sheet-a', [entryA, entryB])

    db.sheets.push(sheet)

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
