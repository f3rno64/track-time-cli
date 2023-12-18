/* eslint-env mocha */

import isAnsi from 'is-ansi'
import { expect } from 'chai'
import { clHighlightRed } from '../../color'

describe('color:highlight_red', () => {
  it('colors the provided string', () => {
    expect(isAnsi(clHighlightRed('Some text'))).to.equal(true)
  })
})
