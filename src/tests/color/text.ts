/* eslint-env mocha */

import isAnsi from 'is-ansi'
import { expect } from 'chai'
import { clText } from '../../color'

describe('color:text', () => {
  it('colors the provided string', () => {
    expect(isAnsi(clText('some value'))).to.equal(true)
  })
})
