/* eslint-env mocha */

import { expect } from 'chai'

import DB from '../../db'
import { getDaysMS } from '../../dates'
import { getSheetsWithEntriesInLastWeek } from '../../utils'

describe('utils:get_sheets_with_entries_in_last_week', function () {
  it('should only return sheets with entries within the last week', function () {
    const startA = new Date(Date.now() - getDaysMS(5))
    const endA = new Date(Date.now() - getDaysMS(3))

    const startB = new Date(Date.now() - getDaysMS(20))
    const endB = new Date(Date.now() - getDaysMS(30))

    const entryA = DB.genSheetEntry(0, 'test-a', startA, endA)
    const entryB = DB.genSheetEntry(1, 'test-b', startB, endB)

    const sheetA = DB.genSheet('test-a', [entryA])
    const sheetB = DB.genSheet('test-b', [entryB])

    const results = getSheetsWithEntriesInLastWeek([sheetA, sheetB])

    expect(results).to.have.length(1)
  })
})
