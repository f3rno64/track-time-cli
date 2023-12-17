import sAgo from 's-ago'
import { type Argv } from 'yargs'

import _sum from 'lodash/sum'
import weekday from 'weekday'
import _isEmpty from 'lodash/isEmpty'

import DB from '../db'
import log from '../log'
import * as U from '../utils'
import * as C from '../color'
import { type TimeSheetEntry, type TimeSheet } from '../types'

const COMMAND_CONFIG = {
  command: 'week [sheets..]',
  describe: 'Display a summary of activity for the past week',
  aliases: ['w'],
  builder: (yargs: Argv) =>
    yargs
      .option('total', {
        describe: 'Display total duration for the week for all sheets',
        alias: 't',
        type: 'boolean'
      })
      .option('ago', {
        description: 'Print dates as relative time (e.g. 5 minutes ago)',
        alias: ['r', 'relative'],
        type: 'boolean'
      })
      .option('humanize', {
        describe: 'Print the total duration in human-readable format',
        alias: 'h',
        type: 'boolean'
      })
      .positional('sheets', {
        describe: 'Only show results for these sheets',
        array: true
      })
}

interface WeekCommandArguments {
  db: DB
  total?: boolean
  sheets?: string[]
  ago?: boolean
  humanize?: boolean
}

const DAY_MS = 24 * 60 * 60 * 1000
const LAST_WEEK_DATE = new Date(
  +U.getStartDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
)

const getSheetsWithEntriesInLastWeek = (sheets: TimeSheet[]) => {
  const startOfOneWeekAgo = U.getStartDate(LAST_WEEK_DATE)
  const endOfToday = U.getEndDate()

  return sheets
    .filter(({ entries }) => entries.length > 0)
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
}

interface WeekdayResult {
  duration: number
  entries: number
}

type SheetResults = Record<string, WeekdayResult>
type WeekdayResults = Record<string, SheetResults>
type TotalResults = Record<string, WeekdayResult>

const handler = (args: WeekCommandArguments) => {
  const { ago, humanize, sheets: inputSheets, total, db } = args

  const selectedSheets: TimeSheet[] =
    typeof inputSheets === 'undefined' || _isEmpty(inputSheets)
      ? db.getAllSheets()
      : inputSheets.map(db.getSheet.bind(db))

  const relevantSheets = getSheetsWithEntriesInLastWeek(selectedSheets)
  const results: WeekdayResults = {}

  let totalDuration = 0
  let totalEntries = 0

  relevantSheets.forEach(({ name, entries }) => {
    const sheetResults: Record<string, WeekdayResult> = {}

    entries.forEach((entry: TimeSheetEntry) => {
      for (let i = 0; i < 7; i += 1) {
        const date = new Date(+LAST_WEEK_DATE + i * DAY_MS)
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

export default {
  ...COMMAND_CONFIG,
  handler
}
