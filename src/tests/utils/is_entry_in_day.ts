/* eslint-env mocha */

import { expect } from 'chai'

import DB from '../../db'
import * as D from '../../dates'
import { isEntryInDay } from '../../utils'

describe('utils:is_entry_in_day', () => {
  it('returns true if the entry overlaps with the day', () => {
    const date = D.getPastDay(4)
    const entryStart = D.getPastDay(7)
    const entryEnd = D.getPastDay(2)
    const entry = DB.genSheetEntry(0, 'test-a', entryStart, entryEnd)

    expect(isEntryInDay(date, entry)).to.be.true
  })
})
