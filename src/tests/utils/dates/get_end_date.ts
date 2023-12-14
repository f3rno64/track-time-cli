/* eslint-env mocha */

import { expect } from 'chai'
import { getEndDate } from '../../../utils'

describe('utils:dates:get_end_date', () => {
  it('returns a date set to the end of the provided date', () => {
    const date = new Date()
    const result = getEndDate(date)

    expect(result.getUTCFullYear()).to.equal(date.getUTCFullYear())
    expect(result.getUTCMonth()).to.equal(date.getUTCMonth())
    expect(result.getUTCDay()).to.equal(date.getUTCDay())
    expect(result.getUTCHours()).to.equal(23)
    expect(result.getUTCMinutes()).to.equal(59)
    expect(result.getUTCSeconds()).to.equal(59)
    expect(result.getUTCMilliseconds()).to.equal(999)
  })
})
