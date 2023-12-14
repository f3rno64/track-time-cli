/* eslint-env mocha */

import { expect } from 'chai'
import { getStartDate } from '../../../utils'

describe('utils:dates:get_start_date', () => {
  it('returns a date set to the start of the provided date', () => {
    const date = new Date()
    const result = getStartDate(date)

    expect(result.getUTCFullYear()).to.equal(date.getUTCFullYear())
    expect(result.getUTCMonth()).to.equal(date.getUTCMonth())
    expect(result.getUTCDay()).to.equal(date.getUTCDay())
    expect(result.getUTCHours()).to.equal(0)
    expect(result.getUTCMinutes()).to.equal(0)
    expect(result.getUTCSeconds()).to.equal(0)
    expect(result.getUTCMilliseconds()).to.equal(0)
  })
})
