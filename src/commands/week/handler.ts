import sAgo from 's-ago'
import weekday from 'weekday'
import _sum from 'lodash/sum'
import _isEmpty from 'lodash/isEmpty'

import log from '../../log'
import * as C from '../../color'
import * as U from '../../utils'
import * as D from '../../dates'
import { type TimeSheet, type TimeSheetEntry } from '../../types'
import {
  type WeekCommandArgs,
  type WeekdayResults,
  type WeekdayResult,
  type TotalResults
} from './types'

const handler = (args: WeekCommandArgs) => {
  const { help, yargs, ago, humanize, sheets: inputSheets, total, db } = args

  if (help) {
    yargs.showHelp()
    process.exit(0)
  }

  const selectedSheets: TimeSheet[] =
    typeof inputSheets === 'undefined' || _isEmpty(inputSheets)
      ? db.getAllSheets()
      : inputSheets.map(db.getSheet.bind(db))

  const relevantSheets = U.getSheetsWithEntriesInLastWeek(selectedSheets)
  const results: WeekdayResults = {}

  let totalDuration = 0
  let totalEntries = 0

  relevantSheets.forEach(({ name, entries }) => {
    const sheetResults: Record<string, WeekdayResult> = {}

    entries.forEach((entry: TimeSheetEntry) => {
      for (let i = 0; i < 7; i += 1) {
        const lastWeekDate = new Date(Date.now() - D.getDaysMS(7))
        const date = new Date(+lastWeekDate + i * D.getDaysMS(1))
        const dateKey = date.toLocaleDateString()
        const duration = U.getEntryDurationInDay(entry, date)

        if (duration === 0) {
          continue
        }

        totalDuration += duration
        totalEntries += 1

        if (typeof sheetResults[dateKey] === 'undefined') {
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
    `${C.clText('* Total duration:')} ${C.clDuration(
      U.getDurationLangString(totalDuration, humanize)
    )} ${C.clHighlight(`[${totalEntries} entries]`)}`
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

        if (typeof totalResults[dateKey] === 'undefined') {
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
        `${C.clDate(`- ${dateWeekday} ${dateString}`)}: ${C.clHighlight(
          `${entries} entries`
        )} ${C.clDuration(`[${U.getDurationLangString(duration, humanize)}]`)}`
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
        `${C.clText('- Sheet')} ${C.clSheet(sheetName)} ${C.clDuration(
          `[${U.getDurationLangString(sheetTotalDuration, humanize)}]`
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
          `  ${C.clDate(`- ${dateWeekday}`)} ${C.clHighlightRed(
            `(${dateStringUI})`
          )}: ${C.clHighlight(`${entries} entries,`)} ${C.clDuration(
            `[${U.getDurationLangString(duration, humanize)}]`
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
