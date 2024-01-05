/* eslint-env mocha */

import isAnsi from 'is-ansi'
import { expect } from 'chai'
import { clID } from '../../color'

const { CI } = process.env

describe('color:id', function () {
  it('colors the provided string', function () {
    if (CI) {
      return this.skip()
    }

    expect(isAnsi(clID('id'))).to.equal(true)
  })

  it('accepts numeric values', function () {
    if (CI) {
      return this.skip()
    }

    expect(isAnsi(clID(42))).to.equal(true)
  })
})
