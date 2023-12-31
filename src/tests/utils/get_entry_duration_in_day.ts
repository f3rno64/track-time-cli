/* eslint-env mocha */

import { expect } from 'chai'
import * as D from '../../dates'
import { type TimeSheetEntry } from '../../types'
import { getEntryDurationInDay } from '../../utils'

const YESTERDAY = D.getStartOfDay(D.getPastDay(1))
const YESTERDAY_MS = +YESTERDAY

describe('utils:get_entry_duration_in_day', function () {
  it('returns 0 if entry starts and ends prior to the provided day', function () {
    const entry = {
      start: D.getPastDay(7),
      end: D.getPastDay(6)
    } as TimeSheetEntry

    const duration = getEntryDurationInDay(entry, YESTERDAY)

    expect(duration).to.equal(0)
  })

  it('returns 0 if entry starts and ends after the provided day', function () {
    const entry = {
      start: D.getFutureDay(7),
      end: D.getFutureDay(6)
    } as TimeSheetEntry

    const duration = getEntryDurationInDay(entry, YESTERDAY)

    expect(duration).to.equal(0)
  })

  it('returns correct duration if start is within the day and end is null', function () {
    const entry = {
      start: new Date(YESTERDAY_MS + D.getHoursMS(12)),
      end: null
    } as TimeSheetEntry

    const duration = getEntryDurationInDay(entry, YESTERDAY)

    expect(duration).to.be.closeTo(D.getHoursMS(12), 1)
  })

  it('returns correct duration if start is prior to day and end is null', function () {
    const entry = {
      start: new Date(YESTERDAY_MS - D.getDaysMS(1)),
      end: null
    } as TimeSheetEntry

    const duration = getEntryDurationInDay(entry, YESTERDAY)

    expect(duration).to.be.closeTo(D.getDaysMS(1), 1)
  })

  it('returns correct duration if start is prior to day and end is within day', function () {
    const entry = {
      start: new Date(YESTERDAY_MS - D.getDaysMS(2)),
      end: new Date(YESTERDAY_MS + D.getHoursMS(12))
    } as TimeSheetEntry

    const duration = getEntryDurationInDay(entry, YESTERDAY)

    expect(duration).to.be.closeTo(D.getHoursMS(12), 1)
  })

  it('returns correct duration if start is within day and end is null', function () {
    const entry = {
      start: new Date(YESTERDAY_MS + D.getHoursMS(12)),
      end: null
    } as TimeSheetEntry

    const duration = getEntryDurationInDay(entry, YESTERDAY)

    expect(duration).to.be.closeTo(D.getHoursMS(12), 1)
  })

  it('returns correct duration if both start and end are within day', function () {
    const entry = {
      start: new Date(YESTERDAY_MS + D.getHoursMS(4)),
      end: new Date(YESTERDAY_MS + D.getHoursMS(12))
    } as TimeSheetEntry

    const duration = getEntryDurationInDay(entry, YESTERDAY)

    expect(duration).to.be.closeTo(D.getHoursMS(8), 1)
  })
})
