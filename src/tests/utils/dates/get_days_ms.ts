/* eslint-env mocha */

import { expect } from 'chai'

import { getDaysMS } from '../../../dates'

describe('utils:dates:get_days_ms', function () {
  it('returns correct values', function () {
    expect(getDaysMS(1)).to.equal(86400000)
    expect(getDaysMS(2)).to.equal(172800000)
  })
})
