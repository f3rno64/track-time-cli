/* eslint-env mocha */

import isAnsi from 'is-ansi'
import { expect } from 'chai'
import { clError } from '../../color'

const { CI } = process.env

describe('color:error', function () {
  it('colors the provided string', function () {
    if (CI) {
      return this.skip()
    }

    expect(isAnsi(clError('Some error'))).to.equal(true)
  })

  it('accepts error objects', function () {
    if (CI) {
      return this.skip()
    }

    expect(isAnsi(clError(new Error('Some error')))).to.equal(true)
  })
})
