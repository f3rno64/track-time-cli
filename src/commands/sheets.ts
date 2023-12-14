import ago from 's-ago'
import _sum from 'lodash/sum'
import parseDate from 'time-speak'
import _isEmpty from 'lodash/isEmpty'
import formatDuration from 'format-duration'
import humanizeDuration from 'humanize-duration'

import log from '../log'
import * as C from '../color'
import * as P from '../print'
import { TimeSheet, type TimeTrackerDB } from '../types'

const COMMAND_CONFIG = {
  command: 'sheets',
  describe: 'List all sheets',
  aliases: ['ss'],
  builder: {
    humanize: {
      describe: 'Humanize the total duration',
      type: 'boolean'
    },

    since: {
      describe: 'Filter sheets, entries, and durations since a given date'
    }
  }
}

interface SheetsCommandArgs {
  db: TimeTrackerDB
  humanize?: boolean
  since?: string
}

const handler = async (args: SheetsCommandArgs) => {
  const { since, humanize, db } = args
  const { activeSheetName, sheets } = db

  if (sheets.length === 0) {
    throw new Error('No time sheets exist')
  }

  const sinceDate = _isEmpty(since) ? null : parseDate(since)

  // prettier-ignore
  const filteredSheets = _isEmpty(since)
    ? sheets
    : sheets.map(
      ({ entries, ...otherSheetData }) => ({
        ...otherSheetData,
        entries: entries.filter(({ start }) => start >= sinceDate)
      })
    ).filter(({ entries }) => entries.length > 0)

  if (filteredSheets.length === 0) {
    throw new Error(`No sheets since ${sinceDate.toLocaleString()}`)
  }

  if (!_isEmpty(since)) {
    log(
      `${C.clText('Showing sheets since')} ${C.clHighlight(
        sinceDate.toLocaleString()
      )} ${C.clDateAgo(`[${ago(sinceDate)}]`)}`
    )
    log('')
  }

  const sheetHeaderRows = filteredSheets.map((sheet: TimeSheet): string[] =>
    P.getSheetHeaderColumns(sheet, sheet.name === activeSheetName, humanize)
  )

  P.printJustifiedContent(sheetHeaderRows)

  const totalDuration = _sum(
    filteredSheets.map(({ entries }) =>
      _sum(
        entries.map(({ start, end }) =>
          end === null ? Date.now() - +start : +end - +start
        )
      )
    )
  )

  log('')
  log(
    `${C.clText('Total duration')}: ${C.clDuration(
      `[${formatDuration(totalDuration)}]`
    )} ${C.clHighlight(humanizeDuration(totalDuration))}`
  )
}

export { handler }
export default {
  ...COMMAND_CONFIG,
  handler
}
