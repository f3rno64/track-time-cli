/* eslint-env mocha */

import isAnsi from 'is-ansi'
import { expect } from 'chai'
import { clID } from '../../color'

describe('color:id', () => {
  it('colors the provided string', () => {
    expect(isAnsi(clID('id'))).to.equal(true)
  })

  it('accepts numeric values', () => {
    expect(isAnsi(clID(42))).to.equal(true)
  })
})
