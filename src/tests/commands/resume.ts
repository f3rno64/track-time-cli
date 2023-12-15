/* eslint-env mocha */

import _last from 'lodash/last'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'

import DB from '../../db'
import { handler } from '../../commands/resume'
import { type TimeSheetEntry } from '../../types'
import { genSheet, genSheetEntry } from '../../sheets'

chai.use(chaiAsPromised)

const db = new DB()

describe('commands:resume:handler', () => {
  beforeEach(async () => {
    await db.load()
  })

  afterEach(async () => {
    await db.delete()
  })

  it('throws an error if there is no active sheet', () => {
    const p = handler({ db })

    chai.expect(p).to.be.rejectedWith('No active sheet')
  })

  it('throws an error if there is no recent entry for the active sheet', () => {
    const sheet = genSheet('test-sheet')
    const { name: sheetName } = sheet

    if (db.db === null) {
      throw new Error('Test DB is null')
    }

    db.db.sheets.push(sheet)
    db.db.activeSheetName = sheetName

    const p = handler({ db })

    chai.expect(p).to.be.rejectedWith(`No recent entry for sheet ${sheetName}`)
  })

  it('throws an error if the active sheet already has a running entry', () => {
    const entryA = genSheetEntry(0, 'test-a', new Date(), new Date())
    const entryB = genSheetEntry(0, 'test-b', new Date())
    const sheet = genSheet('test-sheet', [entryA, entryB], entryB.id)
    const { name: sheetName } = sheet

    if (db.db === null) {
      throw new Error('Test DB is null')
    }

    db.db.sheets.push(sheet)
    db.db.activeSheetName = sheetName

    const p = handler({ db })

    chai
      .expect(p)
      .to.be.rejectedWith(
        `Sheet ${sheetName} already has an active entry (${entryB.id}: ${entryB.description})`
      )
  })

  it('creates a new entry with the same description as the most recently ended entry and adds it to the sheet', (done) => {
    const entryA = genSheetEntry(0, 'test-a', new Date(), new Date())
    const entryB = genSheetEntry(
      0,
      'test-b',
      new Date(Date.now() + 1000),
      new Date(Date.now() + 100000)
    )
    const sheet = genSheet('test-sheet', [entryA, entryB])
    const { name: sheetName } = sheet

    if (db.db === null) {
      throw new Error('Test DB is null')
    }

    db.db.sheets.push(sheet)
    db.db.activeSheetName = sheetName

    handler({ db }).then(() => {
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
