/* eslint-env mocha */

import { expect } from 'chai'
import { getEndOfHourDate } from '../../../dates'

describe('utils:dates:get_end_of_hour_date', () => {
  it('returns a date set to the end of the provided date hour', () => {
    const date = new Date()
    const hour = 2
    const result = getEndOfHourDate(hour, date)

    expect(result.getFullYear()).to.equal(date.getFullYear())
    expect(result.getMonth()).to.equal(date.getMonth())
    expect(result.getDay()).to.equal(date.getDay())
    expect(result.getHours()).to.equal(hour)
    expect(result.getMinutes()).to.equal(59)
    expect(result.getSeconds()).to.equal(59)
    expect(result.getMilliseconds()).to.equal(999)
  })
})
