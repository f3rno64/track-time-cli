/* eslint-env mocha */

import isAnsi from 'is-ansi'
import { expect } from 'chai'
import { clHighlight } from '../../color'

describe('color:highlight', () => {
  it('colors the provided string', () => {
    expect(isAnsi(clHighlight('Some text'))).to.equal(true)
  })
})
