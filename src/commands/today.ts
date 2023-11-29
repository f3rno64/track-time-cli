import _sum from 'lodash/sum'
import _flatten from 'lodash/flatten'
import formatDuration from 'format-duration'

import * as C from '../color'
import * as U from '../utils'
import * as P from '../print'
import { getTotalSheetDuration } from '../sheets'
import { type TimeSheetEntry, type TimeTrackerDB } from '../types'

const COMMAND_CONFIG = {
  command: 'today',
  describe: 'Display a summary of activity for today'
}

interface TodayCommandArguments {
  db: TimeTrackerDB
}

const getDateForStartOfToday = (): Date => {
  const d = new Date()

  d.setHours(0)
  d.setMinutes(0)
  d.setSeconds(0)
  d.setMilliseconds(0)

  return d
}

const getDateForEndOfToday = (): Date => {
  const d = new Date()

  d.setHours(23)
  d.setMinutes(59)
  d.setSeconds(59)
  d.setMilliseconds(999)

  return d
}

const isEntryForToday = (entry: TimeSheetEntry): boolean => {
  const { start, end } = entry
  const startOfToday = getDateForStartOfToday()
  const endOfToday = getDateForEndOfToday()

  return +start >= +startOfToday && (end === null || +end <= +endOfToday)
}

const handler = (args: TodayCommandArguments) => {
  const { db } = args
  const { sheets } = db
  const sheetsWithEntriesForToday = sheets
    .map(({ entries, ...otherSheetData }) => ({
      entries: entries.filter(isEntryForToday),
      ...otherSheetData
    }))
    .filter(({ entries }) => entries.length > 0)

  if (sheetsWithEntriesForToday.length === 0) {
    console.log(C.clText('No entries for today'))
    return
  }

  sheetsWithEntriesForToday.forEach(
    ({ activeEntryID, name, entries }, i: number) => {
      console.log(`${C.clText('- Sheet')} ${C.clSheet(name)}`)

      entries.map((entry: TimeSheetEntry): void => {
        P.printSheetEntry(entry, entry.id === activeEntryID)
      })

      if (i < sheetsWithEntriesForToday.length - 1) {
        console.log('')
      }
    }
  )

  const totalEntries = _sum(
    sheetsWithEntriesForToday.map(({ entries }) => entries.length)
  )
  const totalDuration = getTotalSheetDuration(sheetsWithEntriesForToday)
  const totalDurationUI = formatDuration(totalDuration)

  console.log('')
  console.log(
    `${C.clHighlight(`${totalEntries}`)} ${C.clText(
      'entries, total duration'
    )} ${C.clDuration(totalDurationUI)}`
  )
}

export default {
  ...COMMAND_CONFIG,
  handler: U.cmdHandler(handler)
}
