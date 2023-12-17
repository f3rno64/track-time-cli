import sAgo from 's-ago'
import weekday from 'weekday'
import _uniq from 'lodash/uniq'
import parseDate from 'time-speak'
import { eachDayOfInterval } from 'date-fns'
import formatDuration from 'format-duration'

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

  const results: Record<string, BreakdownResult> = {}
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
        const duration = U.getEntryDurationInDay(entry, date)

        if (typeof results[dateKey] === 'undefined') {
          results[dateKey] = {
            date,
            duration,
            sheets: [sheet],
            entries: [entry]
          }
        } else {
          const resultEntry = results[dateKey]
          results[dateKey] = {
            ...resultEntry,
            duration: resultEntry.duration + duration,
            entries: [...resultEntry.entries, entry],
            sheets: _uniq([...resultEntry.sheets, sheet])
          }
        }
      })
    })
  })

  const resultItems = Object.values(results)

  if (resultItems.length === 0) {
    throw new Error('No results found')
  }

  log(`${C.clText('* Breakdown by Day')} (${C.clSheet(sheetNames.join(', '))})`)
  log('')

  const outputRows = resultItems.map(
    ({ date, duration, sheets, entries }): string[] => {
      const dateUI = ago ? sAgo(date) : date.toLocaleDateString()
      const weekdayUI = weekday(date.getDay() + 1)
      const entryCountUI = U.getPluralizedArrayLength(entries, 'entry')
      const sheetCountUI = U.getPluralizedArrayLength(sheets, 'sheet')

      // prettier-ignore
      const durationUI = humanize
        ? `[${U.getDurationLangString(duration)}]`
        : `[${formatDuration(duration)}]`

      return [
        '-',
        C.clHighlight(weekdayUI),
        C.clDate(dateUI),
        C.clText(entryCountUI),
        C.clText(sheetCountUI),
        C.clDuration(durationUI)
      ]
    }
  )

  P.printJustifiedContent(outputRows)
}

export { handler }
export default {
  ...COMMAND_CONFIG,
  handler
}
