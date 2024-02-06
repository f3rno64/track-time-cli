/* eslint-env mocha */

import { expect } from 'chai'

import { type TimeSheetEntry } from '../../types'
import { getEntryDurationInHour } from '../../utils'
import { getFutureHour, getPastHour } from '../../dates'

describe('utils:get_entry_duration_in_hour', function () {
  it('returns 0 if entry starts and ends prior to the provided hour', function () {
    const date = new Date()
    const entry = {
      end: getPastHour(8),
      start: getPastHour(6)
    } as TimeSheetEntry

    const duration = getEntryDurationInHour(entry, date, 2)

    expect(duration).to.equal(0)
  })

  it('returns 0 if entry starts and ends after the provided hour', function () {
    const date = new Date()
    const entry = {
      end: getFutureHour(6),
      start: getFutureHour(4)
    } as TimeSheetEntry

    const duration = getEntryDurationInHour(entry, date, 2)

    expect(duration).to.equal(0)
  })

  // it('returns correct duration if start is within the hour and end is null', function () {
  //   const date = new Date()
  //   const entry = {
  //     start: new Date(+D.getStartOfHour(4) + +D.getMinutesMS(30)),
  //     end: null
  //   } as TimeSheetEntry
  //
  //   const duration = getEntryDurationInHour(entry, date, 4)
  //
  //   expect(duration).to.be.closeTo(D.getMinutesMS(30), 1)
  // })

  // it('returns correct duration if start is prior to day and end is null', function () {
  //   const entry = {
  //     start: new Date(YESTERDAY_MS - D.getDaysMS(1)),
  //     end: null
  //   } as TimeSheetEntry
  //
  //   const duration = getEntryDurationInDay(entry, YESTERDAY)
  //
  //   expect(duration).to.be.closeTo(D.getDaysMS(1), 1)
  // })
  //
  // it('returns correct duration if start is prior to day and end is within day', function () {
  //   const entry = {
  //     start: new Date(YESTERDAY_MS - D.getDaysMS(2)),
  //     end: new Date(YESTERDAY_MS + D.getHoursMS(12))
  //   } as TimeSheetEntry
  //
  //   const duration = getEntryDurationInDay(entry, YESTERDAY)
  //
  //   expect(duration).to.be.closeTo(D.getHoursMS(12), 1)
  // })
  //
  // it('returns correct duration if start is within day and end is null', function () {
  //   const entry = {
  //     start: new Date(YESTERDAY_MS + D.getHoursMS(12)),
  //     end: null
  //   } as TimeSheetEntry
  //
  //   const duration = getEntryDurationInDay(entry, YESTERDAY)
  //
  //   expect(duration).to.be.closeTo(D.getHoursMS(12), 1)
  // })
  //
  // it('returns correct duration if both start and end are within day', function () {
  //   const entry = {
  //     start: new Date(YESTERDAY_MS + D.getHoursMS(4)),
  //     end: new Date(YESTERDAY_MS + D.getHoursMS(12))
  //   } as TimeSheetEntry
  //
  //   const duration = getEntryDurationInDay(entry, YESTERDAY)
  //
  //   expect(duration).to.be.closeTo(D.getHoursMS(8), 1)
  // })
})
