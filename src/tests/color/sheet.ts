/* eslint-env mocha */

import isAnsi from 'is-ansi'
import { expect } from 'chai'
import { clSheet } from '../../color'

describe('color:sheet', () => {
  it('colors the provided string', () => {
    expect(isAnsi(clSheet('name'))).to.equal(true)
  })
})
