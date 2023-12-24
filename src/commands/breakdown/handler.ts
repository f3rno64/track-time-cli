import sAgo from 's-ago'
import _map from 'lodash/map'
import weekday from 'weekday'
import parseDate from 'time-speak'
import { eachHourOfInterval, eachDayOfInterval } from 'date-fns'

import * as OU from './utils'
import log from '../../log'
import * as C from '../../color'
import * as P from '../../print'
import * as U from '../../utils'
import { type BreakdownCommandArgs } from './types'
import {
  type BreakdownResults,
  type TimeSheetEntry,
  type TimeSheet
} from '../../types'

const handler = (args: BreakdownCommandArgs) => {
  const {
    db,
    ago,
    all,
    help,
    yargs,
    humanize,
    since: inputSince,
    sheets: inputSheets
  } = args

  if (help) {
    yargs.showHelp()
    process.exit(0)
  }

  // prettier-ignore
  const targetSheets = all
    ? db.getAllSheets()
    : typeof inputSheets === 'undefined'
      ? [db.getActiveSheet()]
      : inputSheets.map((sheet: string) => db.getSheet(sheet))

  const sheetNames = _map(targetSheets, 'name')
  const since =
    typeof inputSince === 'undefined' ? new Date(0) : parseDate(inputSince)

  const resultsPerDay: BreakdownResults = {}
  const resultsPerHour: BreakdownResults = {}
  const resultsPerWeekday: BreakdownResults = {}

  const filteredSheets = U.getSheetsWithEntriesSinceDate(targetSheets, since)

  filteredSheets.forEach((sheet: TimeSheet): void => {
    const { entries } = sheet

    entries.forEach((entry: TimeSheetEntry): void => {
      const { start, end } = entry
      const interval = {
        start,
        end: end === null ? new Date() : end
      }

      const days = eachDayOfInterval(interval)
      const hours = eachHourOfInterval(interval).map((date: Date): number =>
        date.getHours()
      )

      days.forEach((date: Date): void => {
        hours.forEach((hour: number): void => {
          const hourStr = U.getHourString(hour)
          const duration = U.getEntryDurationInHour(entry, date, hour)

          OU.populateResults({
            results: resultsPerHour,
            key: hourStr,
            duration,
            sheet,
            entry,
            date
          })
        })

        const dateKey = date.toLocaleDateString()
        const dateWeekday = weekday(date.getDay() + 1)
        const duration = U.getEntryDurationInDay(entry, date)

        OU.populateResults({
          results: resultsPerWeekday,
          key: dateWeekday,
          duration,
          sheet,
          entry,
          date
        })

        OU.populateResults({
          results: resultsPerDay,
          key: dateKey,
          duration,
          sheet,
          entry,
          date
        })
      })
    })
  })

  const dayResults = Object.values(resultsPerDay)
  const hourResults = Object.keys(resultsPerHour)
  const weekdayResults = Object.keys(resultsPerWeekday)

  if (dayResults.length === 0) {
    throw new Error('No results found')
  }

  log(
    `${C.clText('  = Sheets')} ${C.clHighlightRed(
      `(${sheetNames.length})`
    )} ${C.clSheet(sheetNames.join(', '))} ${C.clText('=')}`
  )

  log('')
  log(`${C.clText('  = Breakdown by Day =')}`)
  log('')

  const resultsPerDayOutputRows: string[][] = []
  const resultsPerHourOutputRows: string[][] = []
  const resultsPerWeekdayOutputRows: string[][] = []

  dayResults.sort(({ date: a }, { date: b }): number => (a > b ? 1 : -1))
  dayResults.forEach(({ date, duration, sheets, entries }): void => {
    const weekdayUI = `(${weekday(date.getDay() + 1)})`
    const dateUI = ago ? sAgo(date) : date.toLocaleDateString()
    const durationUI = U.getDurationLangString(duration, humanize)
    const sheetCountUI = U.getPluralizedArrayLength(sheets, 'sheet')
    const entryCountUI = U.getPluralizedArrayLength(entries, 'entry')

    resultsPerDayOutputRows.push([
      C.clHighlightRed('  *'),
      C.clDate(dateUI),
      C.clHighlight(weekdayUI),
      C.clText(entryCountUI),
      C.clText(sheetCountUI),
      C.clDuration(durationUI)
    ])
  })

  weekdayResults.sort((a: string, b: string) => a.localeCompare(b))
  weekdayResults.forEach((weekdayStr: string): void => {
    const result = resultsPerWeekday[weekdayStr]
    const { duration, sheets, entries } = result
    const durationUI = U.getDurationLangString(duration, humanize)
    const sheetCountUI = U.getPluralizedArrayLength(sheets, 'sheet')
    const entryCountUI = U.getPluralizedArrayLength(entries, 'entry')

    resultsPerWeekdayOutputRows.push([
      C.clHighlightRed('  *'),
      C.clHighlight(`${weekdayStr}s`),
      C.clText(entryCountUI),
      C.clText(sheetCountUI),
      C.clDuration(durationUI)
    ])
  })

  hourResults.sort((a: string, b: string) => {
    const aHour = a.includes('am')
      ? +a.substring(0, a.length - 2)
      : +a.substring(0, a.length - 2) + 12

    const bHour = b.includes('am')
      ? +b.substring(0, b.length - 2)
      : +b.substring(0, b.length - 2) + 12

    return aHour - bHour
  })

  hourResults.forEach((hourStr: string): void => {
    const result = resultsPerHour[hourStr]
    const { duration, sheets, entries } = result
    const durationUI = U.getDurationLangString(duration, humanize)
    const sheetCountUI = U.getPluralizedArrayLength(sheets, 'sheet')
    const entryCountUI = U.getPluralizedArrayLength(entries, 'entry')

    resultsPerHourOutputRows.push([
      C.clHighlightRed('  *'),
      C.clHighlight(hourStr),
      C.clText(entryCountUI),
      C.clText(sheetCountUI),
      C.clDuration(durationUI)
    ])
  })

  P.printJustifiedContent(resultsPerDayOutputRows)
  log('')
  log(C.clText('  = Breakdown by Week Day ='))
  log('')
  P.printJustifiedContent(resultsPerWeekdayOutputRows)
  log('')
  log(C.clText('  = Breakdown by Hour ='))
  log('')
  P.printJustifiedContent(resultsPerHourOutputRows)
}

export default handler
