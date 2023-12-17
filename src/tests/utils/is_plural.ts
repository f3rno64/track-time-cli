/* eslint-env mocha */

import { expect } from 'chai'
import { isPlural } from '../../utils'

describe('utils:is_plural', () => {
  it('returns true if the string is plural', () => {
    expect(isPlural('entries')).to.equal(true)
    expect(isPlural('days')).to.equal(true)
  })

  it('returns false if the string is not plural', () => {
    expect(isPlural('entry')).to.equal(false)
    expect(isPlural('day')).to.equal(false)
  })
})
