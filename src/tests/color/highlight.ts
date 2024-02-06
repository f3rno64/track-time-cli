/* eslint-env mocha */

import isAnsi from 'is-ansi'
import { expect } from 'chai'

import { clHighlight } from '../../color'

const { CI } = process.env

describe('color:highlight', function () {
  it('colors the provided string', function () {
    if (CI) {
      return this.skip()
    }

    expect(isAnsi(clHighlight('Some text'))).to.equal(true)
  })
})
