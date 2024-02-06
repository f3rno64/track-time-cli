/* eslint-env mocha */

import { expect } from 'chai'

import { getDaysMS, getPastDay } from '../../../dates'

describe('utils:dates:get_past_day', function () {
  it('returns a date set to the start of the provided date', function () {
    const targetDate = new Date(Date.now() - getDaysMS(2))
    const result = getPastDay(2)

    expect(+result).to.be.closeTo(+targetDate, 100)
  })

  it('returns yesterday if called with no arguments', function () {
    const targetDate = new Date(Date.now() - getDaysMS(1))
    const result = getPastDay()

    expect(+result).to.be.closeTo(+targetDate, 100)
  })
})
