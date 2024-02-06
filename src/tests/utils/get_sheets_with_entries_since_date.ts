/* eslint-env mocha */

import { expect } from 'chai'

import DB from '../../db'
import { getPastDay } from '../../dates'
import { getSheetsWithEntriesSinceDate } from '../../utils'

describe('utils:get_sheets_with_entries_since_date', function () {
  it('should only return sheets with entries since the given date', function () {
    const sinceDate = getPastDay(5)
    const entryA = DB.genSheetEntry(0, 'test-a', getPastDay(3), getPastDay(2))

    const entryB = DB.genSheetEntry(1, 'test-b', getPastDay(9), getPastDay(8))

    const sheetA = DB.genSheet('test-a', [entryA])
    const sheetB = DB.genSheet('test-b', [entryB])

    const results = getSheetsWithEntriesSinceDate([sheetA, sheetB], sinceDate)

    expect(results).to.have.length(1)
    expect(results[0]).to.deep.equal(sheetA)
  })
})
