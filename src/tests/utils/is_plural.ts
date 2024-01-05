/* eslint-env mocha */

import { expect } from 'chai'
import { isPlural } from '../../utils'

describe('utils:is_plural', function () {
  it('returns true if the string is plural', function () {
    expect(isPlural('entries')).to.equal(true)
    expect(isPlural('days')).to.equal(true)
  })

  it('returns false if the string is not plural', function () {
    expect(isPlural('entry')).to.equal(false)
    expect(isPlural('day')).to.equal(false)
  })
})
