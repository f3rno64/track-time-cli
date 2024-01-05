/* eslint-env mocha */

import { expect } from 'chai'
import { getDaysMS, getFutureDay } from '../../../dates'

describe('utils:dates:get_future_day', function () {
  it('returns a date set to the start of the provided date', function () {
    const targetDate = new Date(Date.now() + getDaysMS(2))
    const result = getFutureDay(2)

    expect(+result).to.be.closeTo(+targetDate, 1)
  })
})
