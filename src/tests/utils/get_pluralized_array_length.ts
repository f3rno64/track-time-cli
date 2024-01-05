/* eslint-env mocha */

import { expect } from 'chai'
import { getPluralizedArrayLength } from '../../utils'

describe('utils:get_pluralized_array_length', function () {
  it('returns a singular label if the array has only 1 item', function () {
    const resultA = getPluralizedArrayLength(['a'], 'entry')
    const resultB = getPluralizedArrayLength(['a'], 'day')
    const resultC = getPluralizedArrayLength(['a'], 'time')

    expect(resultA).to.equal('1 entry')
    expect(resultB).to.equal('1 day')
    expect(resultC).to.equal('1 time')
  })

  it('returns a plural label if the array has more than one item', function () {
    const resultA = getPluralizedArrayLength(['a', 'b'], 'entry')
    const resultB = getPluralizedArrayLength(['a', 'b'], 'day')
    const resultC = getPluralizedArrayLength(['a', 'b'], 'time')

    expect(resultA).to.equal('2 entries')
    expect(resultB).to.equal('2 days')
    expect(resultC).to.equal('2 times')
  })

  it('handles plural labels', function () {
    const resultA = getPluralizedArrayLength(['a', 'b'], 'entries')
    const resultB = getPluralizedArrayLength(['a', 'b'], 'days')
    const resultC = getPluralizedArrayLength(['a', 'b'], 'times')

    expect(resultA).to.equal('2 entries')
    expect(resultB).to.equal('2 days')
    expect(resultC).to.equal('2 times')
  })
})
