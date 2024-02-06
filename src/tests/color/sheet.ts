/* eslint-env mocha */

import isAnsi from 'is-ansi'
import { expect } from 'chai'

import { clSheet } from '../../color'

const { CI } = process.env

describe('color:sheet', function () {
  it('colors the provided string', function () {
    if (CI) {
      return this.skip()
    }

    expect(isAnsi(clSheet('name'))).to.equal(true)
  })
})
