import sAgo from 's-ago'
import weekday from 'weekday'
import _uniq from 'lodash/uniq'
import parseDate from 'time-speak'
import { eachHourOfInterval, eachDayOfInterval } from 'date-fns'

import DB from '../db'
import log from '../log'
import * as U from '../utils'
import * as C from '../color'
import * as P from '../print'
import * as O from '../options'
import { type TimeSheetEntry, type TimeSheet } from '../types'

const COMMAND_CONFIG = {
  command: 'breakdown [sheets..]',
  describe: 'Display total durations per day for one or more sheets',
  aliases: ['b'],
  builder: O.setup.bind(null, [
    O.AllOption,
    O.AgoOption,
    O.HumanizeOption,
    O.SinceOption
  ])
}

interface BreakdownCommandArguments {
  db: DB
  sheets?: string[]
  humanize?: boolean
  all?: boolean
  since?: string
  ago?: boolean
}

interface BreakdownResult {
  date: Date
  duration: number
  sheets: TimeSheet[]
  entries: TimeSheetEntry[]
}

const handler = (args: BreakdownCommandArguments) => {
  const {
    ago,
    humanize,
    all,
    since: inputSince,
    sheets: inputSheets,
    db
  } = args

  // prettier-ignore
  const targetSheets = all
    ? db.getAllSheets()
    : typeof inputSheets === 'undefined'
      ? [db.getActiveSheet()]
      : inputSheets.map((sheet: string) => db.getSheet(sheet))

  const sheetNames = targetSheets.map(({ name }) => name)
  const since =
    typeof inputSince === 'undefined' ? new Date(0) : parseDate(inputSince)

  const resultsPerDay: Record<string, BreakdownResult> = {}
  const resultsPerWeekday: Record<string, BreakdownResult> = {}
  const resultsPerHour: Record<string, BreakdownResult> = {}

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
          const hourStr = hour > 11 ? `${hour - 11}pm` : `${hour + 1}am`
          const duration = U.getEntryDurationInHour(entry, date, hour)

          if (typeof resultsPerHour[hourStr] === 'undefined') {
            resultsPerHour[hourStr] = {
              date,
              duration,
              sheets: [sheet],
              entries: [entry]
            }
          } else {
            const resultEntry = resultsPerHour[hourStr]

            resultsPerHour[hourStr] = {
              ...resultEntry,
              duration: resultEntry.duration + duration,
              entries: [...resultEntry.entries, entry],
              sheets: _uniq([...resultEntry.sheets, sheet])
            }
          }
        })

        const dateKey = date.toLocaleDateString()
        const dateWeekday = weekday(date.getDay() + 1)
        const duration = U.getEntryDurationInDay(entry, date)

        if (typeof resultsPerWeekday[dateWeekday] === 'undefined') {
          resultsPerWeekday[dateWeekday] = {
            date,
            duration,
            sheets: [sheet],
            entries: [entry]
          }
        } else {
          const resultEntry = resultsPerWeekday[dateWeekday]

          resultsPerWeekday[dateWeekday] = {
            ...resultEntry,
            duration: resultEntry.duration + duration,
            entries: [...resultEntry.entries, entry],
            sheets: _uniq([...resultEntry.sheets, sheet])
          }
        }

        if (typeof resultsPerDay[dateKey] === 'undefined') {
          resultsPerDay[dateKey] = {
            date,
            duration,
            sheets: [sheet],
            entries: [entry]
          }
        } else {
          const resultEntry = resultsPerDay[dateKey]

          resultsPerDay[dateKey] = {
            ...resultEntry,
            duration: resultEntry.duration + duration,
            entries: [...resultEntry.entries, entry],
            sheets: _uniq([...resultEntry.sheets, sheet])
          }
        }
      })
    })
  })

  const dayResults = Object.values(resultsPerDay)
  const weekdayResults = Object.keys(resultsPerWeekday)
  const hourResults = Object.keys(resultsPerHour)

  if (dayResults.length === 0) {
    throw new Error('No results found')
  }

  log(
    `${C.clText('  = Sheets')} ${C.clHighlightRed(
      `(${sheetNames.length})`
    )} ${C.clSheet(sheetNames.join(', '))} ${C.clText('=')}`
  )

  log('')

  log(
    `${C.clText('  = Breakdown by Day =')} (${C.clSheet(
      sheetNames.join(', ')
    )})`
  )
  log('')

  const resultsPerDayOutputRows: string[][] = []
  const resultsPerWeekdayOutputRows: string[][] = []
  const resultsPerHourOutputRows: string[][] = []

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
  log(C.clText('  = Totals per Week Day ='))
  log('')
  P.printJustifiedContent(resultsPerWeekdayOutputRows)
  log('')
  log(C.clText('  = Totals per Hour ='))
  log('')
  P.printJustifiedContent(resultsPerHourOutputRows)
}

export { handler }
export default {
  ...COMMAND_CONFIG,
  handler
}
