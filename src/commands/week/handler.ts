import sAgo from 's-ago'
import _sum from 'lodash/sum'
import weekday from 'weekday'
import _isEmpty from 'lodash/isEmpty'
import _isUndefined from 'lodash/isUndefined'

import log from '../../log'
import { getDaysMS } from '../../dates'
import { type TimeSheet, type TimeSheetEntry } from '../../types'
import {
  clText,
  clDate,
  clSheet,
  clDuration,
  clHighlight,
  clHighlightRed
} from '../../color'

import {
  getDurationLangString,
  getEntryDurationInDay,
  getSheetsWithEntriesInLastWeek
} from '../../utils'

import {
  type TotalResults,
  type WeekdayResult,
  type WeekdayResults,
  type WeekCommandArgs
} from './types'

// eslint-disable-next-line sonarjs/cognitive-complexity
const handler = (args: WeekCommandArgs): void => {
  const { ago, db, help, humanize, sheets: inputSheets, total, yargs } = args

  if (help) {
    yargs.showHelp()
    process.exit(0)
  }

  const selectedSheets: TimeSheet[] =
    _isUndefined(inputSheets) || _isEmpty(inputSheets)
      ? db.getAllSheets()
      : inputSheets.map((name: string): TimeSheet => db.getSheet(name))

  const relevantSheets = getSheetsWithEntriesInLastWeek(selectedSheets)
  const results: WeekdayResults = {}

  let totalDuration = 0
  let totalEntries = 0

  relevantSheets.forEach(({ entries, name }) => {
    const sheetResults: Record<string, WeekdayResult> = {}

    entries.forEach((entry: TimeSheetEntry) => {
      for (let i = 0; i < 7; i += 1) {
        const lastWeekDate = new Date(Date.now() - getDaysMS(7))
        const date = new Date(+lastWeekDate + i * getDaysMS(1))
        const dateKey = date.toLocaleDateString()
        const duration = getEntryDurationInDay(entry, date)

        if (duration === 0) {
          continue
        }

        totalDuration += duration
        totalEntries += 1

        if (_isUndefined(sheetResults[dateKey])) {
          sheetResults[dateKey] = {
            duration,
            entries: 1
          }
        } else {
          sheetResults[dateKey] = {
            duration: sheetResults[dateKey].duration + duration,
            entries: sheetResults[dateKey].entries + 1
          }
        }
      }
    })

    results[name] = sheetResults
  })

  log(
    `${clText('* Total duration:')} ${clDuration(
      getDurationLangString(totalDuration, humanize)
    )} ${clHighlight(`[${totalEntries} entries]`)}`
  )

  log('')

  if (total) {
    const totalResults: TotalResults = {}

    Object.keys(results).forEach((sheetName: string) => {
      Object.keys(results[sheetName]).forEach((dateKey: string) => {
        const result = results[sheetName][dateKey]
        const { duration } = result

        if (duration === 0) {
          return
        }

        if (_isUndefined(totalResults[dateKey])) {
          totalResults[dateKey] = {
            duration,
            entries: 1
          }
        } else {
          totalResults[dateKey] = {
            duration: totalResults[dateKey].duration + duration,
            entries: totalResults[dateKey].entries + 1
          }
        }
      })
    })

    Object.keys(totalResults).forEach((dateString: string) => {
      const date = new Date(dateString)
      const dateWeekday = weekday(date.getDay() + 1)
      const result = totalResults[dateString]
      const { duration, entries } = result

      log(
        `${clDate(`- ${dateWeekday} ${dateString}`)}: ${clHighlight(
          `${entries} entries`
        )} ${clDuration(`[${getDurationLangString(duration, humanize)}]`)}`
      )
    })
  } else {
    const sheetNames = Object.keys(results)

    sheetNames.forEach((sheetName: string, i: number) => {
      const sheetResults = results[sheetName]

      if (_isEmpty(sheetResults)) {
        return
      }

      const sheetResultDates = Object.keys(sheetResults)
      const sheetTotalDuration = _sum(
        sheetResultDates.map((date: string) => sheetResults[date].duration)
      )

      log(
        `${clText('- Sheet')} ${clSheet(sheetName)} ${clDuration(
          `[${getDurationLangString(sheetTotalDuration, humanize)}]`
        )}`
      )

      sheetResultDates.forEach((dateString: string) => {
        const dateStringUI = ago ? sAgo(new Date(dateString)) : dateString
        const date = new Date(dateString)
        const dateWeekday = weekday(date.getDay() + 1)
        const result = sheetResults[dateString]
        const { duration, entries } = result

        if (duration === 0) {
          return
        }

        log(
          `  ${clDate(`- ${dateWeekday}`)} ${clHighlightRed(
            `(${dateStringUI})`
          )}: ${clHighlight(`${entries} entries,`)} ${clDuration(
            `[${getDurationLangString(duration, humanize)}]`
          )}`
        )
      })

      if (i < sheetNames.length - 1) {
        log('')
      }
    })
  }
}

export default handler
