import _sum from 'lodash/sum'
import formatDuration from 'format-duration'

import log from '../log'
import * as U from '../utils'
import * as C from '../color'
import {
  type TimeSheetEntry,
  type TimeSheet,
  type TimeTrackerDB
} from '../types'

const COMMAND_CONFIG = {
  command: 'week',
  describe: 'Display a summary of activity for the past week',
  builder: {
    total: {
      describe: 'Display total duration for the week for all sheets',
      type: 'boolean'
    }
  }
}

interface WeekCommandArguments {
  db: TimeTrackerDB
  total: boolean
}

const DAY_MS = 24 * 60 * 60 * 1000
const LAST_WEEK_DATE = new Date(
  +U.getEndDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) + 1
)

const getSheetsWithEntriesInLastWeek = (sheets: TimeSheet[]) => {
  const startOfOneWeekAgo = U.getStartDate(LAST_WEEK_DATE)
  const endOfToday = U.getEndDate()

  return sheets
    .map(({ entries, ...otherSheetData }) => ({
      entries: entries
        .map(({ end, ...entryData }) => ({
          end: end === null ? new Date() : end,
          ...entryData
        }))
        .filter(
          ({ start, end }) =>
            +start >= +startOfOneWeekAgo && +end <= +endOfToday
        ),
      ...otherSheetData
    }))
    .filter(({ entries }) => entries.length > 0)
}

const getEntryDurationInInterval = (
  start: Date,
  end: Date,
  entry: TimeSheetEntry
): number => {
  const { start: entryStart, end: entryEnd } = entry

  if (+entryStart < +start && +entryEnd < +start) {
    return 0
  } else if (+entryStart > +end && +entryEnd > +end) {
    return 0
  } else if (+entryStart >= +start && +entryEnd <= +end) {
    return +entryEnd - +entryStart
  } else if (+entryStart >= +start && +entryEnd > +end) {
    return +end - +entryStart
  } else if (+entryStart < +start && +entryEnd <= +end) {
    return +entryEnd - +start
  } else {
    return 0
  }
}

const handler = (args: WeekCommandArguments) => {
  const { total, db } = args
  const { sheets } = db
  const relevantSheets = getSheetsWithEntriesInLastWeek(sheets)
  const results = {}
  let totalDuration = 0

  relevantSheets.forEach(({ name, entries }) => {
    const sheetResults = {}

    entries.forEach((entry: TimeSheetEntry) => {
      for (let i = 0; i < 7; i += 1) {
        const date = new Date(+LAST_WEEK_DATE + i * DAY_MS)
        const dateKey = date.toLocaleDateString()
        const dateStart = U.getStartDate(date)
        const dateEnd = U.getEndDate(date)
        const duration = getEntryDurationInInterval(dateStart, dateEnd, entry)

        totalDuration += duration

        if (typeof sheetResults[dateKey] === 'undefined') {
          sheetResults[dateKey] = {
            duration,
            entries: duration === 0 ? 0 : 1
          }
        } else {
          sheetResults[dateKey] = {
            duration: sheetResults[dateKey].duration + duration,
            entries:
              duration === 0
                ? sheetResults[dateKey].entries
                : sheetResults[dateKey].entries + 1
          }
        }
      }
    })

    results[name] = sheetResults
  })

  log(
    `${C.clText('* Total duration:')} ${C.clDuration(
      formatDuration(totalDuration)
    )}`
  )

  log('')

  if (total) {
    const totalResults = {}

    Object.keys(results).forEach((sheetName: string) => {
      Object.keys(results[sheetName]).forEach((dateKey: string) => {
        const result = results[sheetName][dateKey]
        const { duration } = result

        if (typeof totalResults[dateKey] === 'undefined') {
          totalResults[dateKey] = duration
        } else {
          totalResults[dateKey] += duration
        }
      })
    })

    Object.keys(totalResults).forEach((dateKey: string) => {
      log(
        `${C.clDateAgo(`- ${dateKey}`)}: ${C.clDuration(
          `[${formatDuration(totalResults[dateKey])}]`
        )}`
      )
    })
  } else {
    const sheetNames = Object.keys(results)

    sheetNames.forEach((sheetName: string, i: number) => {
      const sheetResults = results[sheetName]
      const sheetResultDates = Object.keys(sheetResults)
      const sheetTotalDuration = _sum(
        sheetResultDates.map((date: string) => sheetResults[date].duration)
      )

      log(
        `${C.clSheet(`- Sheet ${sheetName}`)} ${C.clDuration(
          `[${formatDuration(sheetTotalDuration)}]`
        )}`
      )

      sheetResultDates.forEach((date: string) => {
        const result = sheetResults[date]
        const { duration, entries } = result

        if (duration === 0) {
          log(`  ${C.clDateAgo(`- ${date}`)}: ${C.clHighlight('no entries')}`)
        } else {
          log(
            `  ${C.clDateAgo(`- ${date}`)}: ${C.clHighlight(
              `${entries} entries,`
            )} ${C.clDuration(`[${formatDuration(duration)}]`)}`
          )
        }
      })

      if (i < sheetNames.length - 1) {
        log('')
      }
    })
  }
}

export default {
  ...COMMAND_CONFIG,
  handler: U.cmdHandler(handler)
}