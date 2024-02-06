/* eslint-env mocha */

import { expect } from 'chai'

import { getStartOfHour } from '../../../dates'

describe('utils:dates:get_start_of_hour', function () {
  it('returns a date set to the end of the provided date', function () {
    const date = new Date()
    const hour = 2
    const result = getStartOfHour(hour, date)

    expect(result.getFullYear()).to.equal(date.getFullYear())
    expect(result.getMonth()).to.equal(date.getMonth())
    expect(result.getDay()).to.equal(date.getDay())
    expect(result.getHours()).to.equal(hour)
    expect(result.getMinutes()).to.equal(0)
    expect(result.getSeconds()).to.equal(0)
    expect(result.getMilliseconds()).to.equal(0)
  })
})
