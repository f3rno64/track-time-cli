/* eslint-env mocha */

import isAnsi from 'is-ansi'
import { expect } from 'chai'
import { clDuration } from '../../color'

describe('color:duration', () => {
  it('colors the provided string', () => {
    expect(isAnsi(clDuration('10000'))).to.equal(true)
  })

  it('accepts numeric values', () => {
    expect(isAnsi(clDuration(42))).to.equal(true)
  })
})
