/* eslint-env mocha */

import { expect } from 'chai'
import { getHoursMS } from '../../../dates'

describe('utils:dates:get_hours_ms', function () {
  it('returns correct values', function () {
    expect(getHoursMS(1)).to.equal(3600000)
    expect(getHoursMS(2)).to.equal(7200000)
  })
})
