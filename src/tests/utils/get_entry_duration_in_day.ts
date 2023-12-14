/* eslint-env mocha */

import { expect } from 'chai'
import * as U from '../../utils'
import { type TimeSheetEntry } from '../../types'
import { getEntryDurationInDay } from '../../utils'

const YESTERDAY = U.getStartDate(U.getPastDayDate(1))
const YESTERDAY_MS = +YESTERDAY

describe('utils:get_entry_duration_in_day', () => {
  it('returns 0 if entry starts and ends prior to the provided day', () => {
    const entry = {
      start: U.getPastDayDate(7),
      end: U.getPastDayDate(6)
    } as TimeSheetEntry

    const duration = getEntryDurationInDay(entry, YESTERDAY)

    expect(duration).to.equal(0)
  })

  it('returns 0 if entry starts and ends after the provided day', () => {
    const entry = {
      start: U.getFutureDayDate(7),
      end: U.getFutureDayDate(6)
    } as TimeSheetEntry

    const duration = getEntryDurationInDay(entry, YESTERDAY)

    expect(duration).to.equal(0)
  })

  it('returns correct duration if start is within the day and end is null', () => {
    const entry = {
      start: new Date(YESTERDAY_MS + U.getHoursMS(12)),
      end: null
    } as TimeSheetEntry

    const duration = getEntryDurationInDay(entry, YESTERDAY)

    expect(duration).to.be.closeTo(U.getHoursMS(12), 1)
  })

  it('returns correct duration if start is prior to day and end is null', () => {
    const entry = {
      start: new Date(YESTERDAY_MS - U.getDaysMS(1)),
      end: null
    } as TimeSheetEntry

    const duration = getEntryDurationInDay(entry, YESTERDAY)

    expect(duration).to.be.closeTo(U.getDaysMS(1), 1)
  })

  it('returns correct duration if start is prior to day and end is within day', () => {
    const entry = {
      start: new Date(YESTERDAY_MS - U.getDaysMS(2)),
      end: new Date(YESTERDAY_MS + U.getHoursMS(12))
    } as TimeSheetEntry

    const duration = getEntryDurationInDay(entry, YESTERDAY)

    expect(duration).to.be.closeTo(U.getHoursMS(12), 1)
  })

  it('returns correct duration if start is within day and end is null', () => {
    const entry = {
      start: new Date(YESTERDAY_MS + U.getHoursMS(12)),
      end: null
    } as TimeSheetEntry

    const duration = getEntryDurationInDay(entry, YESTERDAY)

    expect(duration).to.be.closeTo(U.getHoursMS(12), 1)
  })

  it('returns correct duration if both start and end are within day', () => {
    const entry = {
      start: new Date(YESTERDAY_MS + U.getHoursMS(4)),
      end: new Date(YESTERDAY_MS + U.getHoursMS(12))
    } as TimeSheetEntry

    const duration = getEntryDurationInDay(entry, YESTERDAY)

    expect(duration).to.be.closeTo(U.getHoursMS(8), 1)
  })
})
