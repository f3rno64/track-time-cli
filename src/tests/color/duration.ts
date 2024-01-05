/* eslint-env mocha */

import isAnsi from 'is-ansi'
import { expect } from 'chai'
import { clDuration } from '../../color'

const { CI } = process.env

describe('color:duration', function () {
  it('colors the provided string', function () {
    if (CI) {
      return this.skip()
    }

    expect(isAnsi(clDuration('10000'))).to.equal(true)
  })

  it('accepts numeric values', function () {
    if (CI) {
      return this.skip()
    }

    expect(isAnsi(clDuration(42))).to.equal(true)
  })
})
