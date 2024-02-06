/* eslint-env mocha */

import { expect } from 'chai'

import { getDaysMS, getYesterday } from '../../../dates'

describe('utils:dates:get_yesterday', function () {
  it('returns a date set to yesterday', function () {
    const expectedDate = new Date(Date.now() - getDaysMS(1))
    const result = getYesterday()

    expect(+result).to.be.closeTo(+expectedDate, 100)
  })
})
