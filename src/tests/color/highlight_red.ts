/* eslint-env mocha */

import isAnsi from 'is-ansi'
import { expect } from 'chai'
import { clHighlightRed } from '../../color'

const { CI } = process.env

describe('color:highlight_red', function () {
  it('colors the provided string', function () {
    if (CI) {
      return this.skip()
    }

    expect(isAnsi(clHighlightRed('Some text'))).to.equal(true)
  })
})
