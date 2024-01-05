/* eslint-env mocha */

import { expect } from 'chai'
import { getEndOfDay } from '../../../dates'

describe('utils:dates:get_end_of_day', function () {
  it('returns a date set to the end of the provided date', function () {
    const date = new Date()
    const result = getEndOfDay(date)

    expect(result.getFullYear()).to.equal(date.getFullYear())
    expect(result.getMonth()).to.equal(date.getMonth())
    expect(result.getDay()).to.equal(date.getDay())
    expect(result.getHours()).to.equal(23)
    expect(result.getMinutes()).to.equal(59)
    expect(result.getSeconds()).to.equal(59)
    expect(result.getMilliseconds()).to.equal(999)
  })
})
