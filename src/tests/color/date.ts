/* eslint-env mocha */

import isAnsi from 'is-ansi'
import { expect } from 'chai'
import { clDate } from '../../color'

describe('color:date', () => {
  it('colors the provided string', () => {
    expect(isAnsi(clDate('2018-01-01'))).to.equal(true)
  })

  it('accepts numeric timestamps', () => {
    expect(isAnsi(clDate(Date.now()))).to.equal(true)
  })

  it('accepts date objects', () => {
    expect(isAnsi(clDate(new Date()))).to.equal(true)
  })
})
