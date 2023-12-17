/* eslint-env mocha */

import { expect } from 'chai'
import { getDaysMS } from '../../../dates'

describe('utils:dates:get_days_ms', () => {
  it('returns correct values', () => {
    expect(getDaysMS(1)).to.equal(86400000)
    expect(getDaysMS(2)).to.equal(172800000)
  })
})
