import sAgo from 's-ago'
import weekday from 'weekday'
import _uniq from 'lodash/uniq'
import parseDate from 'time-speak'
import { eachDayOfInterval } from 'date-fns'

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

  const filteredSheets = U.getSheetsWithEntriesSinceDate(targetSheets, since)

  filteredSheets.forEach((sheet: TimeSheet): void => {
    const { entries } = sheet

    entries.forEach((entry: TimeSheetEntry): void => {
      const { start, end } = entry
      const days = eachDayOfInterval({
        start,
        end: end === null ? new Date() : end
      })

      days.forEach((date: Date): void => {
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

  const resultsPerDayItems = Object.values(resultsPerDay)
  const weekdayResults = Object.keys(resultsPerWeekday)

  if (resultsPerDayItems.length === 0) {
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

  resultsPerDayItems.forEach(({ date, duration, sheets, entries }): void => {
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

  P.printJustifiedContent(resultsPerDayOutputRows)
  log('')
  log(C.clText('  = Totals per Week Day ='))
  log('')
  P.printJustifiedContent(resultsPerWeekdayOutputRows)
}

export { handler }
export default {
  ...COMMAND_CONFIG,
  handler
}
