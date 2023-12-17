import ago from 's-ago'
import _sum from 'lodash/sum'
import parseDate from 'time-speak'
import _isEmpty from 'lodash/isEmpty'
import formatDuration from 'format-duration'

import DB from '../db'
import log from '../log'
import * as C from '../color'
import * as U from '../utils'
import * as P from '../print'
import { TimeSheet } from '../types'

const COMMAND_CONFIG = {
  command: 'sheets',
  describe: 'List all sheets',
  aliases: ['ss'],
  builder: {
    humanize: {
      describe: 'Print the total duration in human-readable format',
      type: 'boolean'
    },

    since: {
      describe: 'Filter sheets, entries, and durations since a given date',
      type: 'string'
    },

    today: {
      describe: 'Show results for today',
      type: 'boolean'
    }
  }
}

interface SheetsCommandArgs {
  db: DB
  humanize?: boolean
  since?: string
  today?: boolean
}

const handler = async (args: SheetsCommandArgs) => {
  const { today, since, humanize, db } = args

  if (!_isEmpty(since) && today) {
    throw new Error('Cannot use both --since and --today')
  }

  const sheets = db.getAllSheets()

  if (sheets.length === 0) {
    throw new Error('No time sheets exist')
  }

  // prettier-ignore
  const sinceDate = !_isEmpty(since)
    ? parseDate(since)
    : today
      ? U.getStartDate()
      : null

  const filteredSheets =
    sinceDate === null
      ? sheets
      : U.getSheetsWithEntriesSinceDate(sheets, sinceDate)

  if (filteredSheets.length === 0) {
    throw new Error(`No sheets since ${sinceDate.toLocaleString()}`)
  }

  if (today) {
    log(
      `${C.clText('* Showing')} ${C.clHighlight(
        `${filteredSheets.length}`
      )} ${C.clText('sheets for today')}`
    )
  } else if (sinceDate !== null) {
    log(
      `${C.clText('* Showing sheets since')} ${C.clHighlight(
        sinceDate.toLocaleString()
      )} ${C.clDate(`[${ago(sinceDate)}]`)}`
    )
  } else {
    log(
      `${C.clText('* Showing')} ${C.clHighlight(
        `${filteredSheets.length}`
      )} ${C.clText('sheets')}`
    )
  }

  log('')

  const activeSheetName = db.getActiveSheetName()
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
    )} ${C.clHighlight(U.getDurationLangString(totalDuration))}`
  )
}

export { handler }
export default {
  ...COMMAND_CONFIG,
  handler
}
