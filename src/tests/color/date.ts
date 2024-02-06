/* eslint-env mocha */

import isAnsi from 'is-ansi'
import { expect } from 'chai'

import { clDate } from '../../color'

const { CI } = process.env

describe('color:date', function () {
  it('colors the provided string', function () {
    if (CI) {
      return this.skip()
    }

    expect(isAnsi(clDate('2018-01-01'))).to.equal(true)
  })

  it('accepts numeric timestamps', function () {
    if (CI) {
      return this.skip()
    }

    expect(isAnsi(clDate(Date.now()))).to.equal(true)
  })

  it('accepts date objects', function () {
    if (CI) {
      return this.skip()
    }

    expect(isAnsi(clDate(new Date()))).to.equal(true)
  })
})
