/* eslint-env mocha */

import { expect } from 'chai'

import DB from '../../db'
import { getPastDay } from '../../dates'
import { isEntryInDay } from '../../utils'

describe('utils:is_entry_in_day', function () {
  it('returns true if the entry overlaps with the day', function () {
    const date = getPastDay(4)
    const entryStart = getPastDay(7)
    const entryEnd = getPastDay(2)
    const entry = DB.genSheetEntry(0, 'test-a', entryStart, entryEnd)

    expect(isEntryInDay(date, entry)).to.be.true
  })
})
