/* eslint-env mocha */

import { expect } from 'chai'
import { getDaysMS, getPastDayDate } from '../../../utils'

describe('utils:dates:get_past_day_date', () => {
  it('returns a date set to the start of the provided date', () => {
    const targetDate = new Date(Date.now() - getDaysMS(2))
    const result = getPastDayDate(2)

    expect(+result).to.equal(+targetDate)
  })
})
