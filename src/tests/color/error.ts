/* eslint-env mocha */

import isAnsi from 'is-ansi'
import { expect } from 'chai'
import { clError } from '../../color'

describe('color:error', () => {
  it('colors the provided string', () => {
    expect(isAnsi(clError('Some error'))).to.equal(true)
  })

  it('accepts error objects', () => {
    expect(isAnsi(clError(new Error('Some error')))).to.equal(true)
  })
})
