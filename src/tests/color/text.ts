/* eslint-env mocha */

import isAnsi from 'is-ansi'
import { expect } from 'chai'

import { clText } from '../../color'

const { CI } = process.env

describe('color:text', function () {
  it('colors the provided string', function () {
    if (CI) {
      return this.skip()
    }

    expect(isAnsi(clText('some value'))).to.equal(true)
  })
})
