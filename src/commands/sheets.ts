import ago from 's-ago'
import _sum from 'lodash/sum'
import parseDate from 'time-speak'
import _isEmpty from 'lodash/isEmpty'

import DB from '../db'
import log from '../log'
import * as C from '../color'
import * as U from '../utils'
import * as P from '../print'
import * as O from '../options'
import { TimeSheet } from '../types'

const COMMAND_CONFIG = {
  command: 'sheets',
  describe: 'List all sheets',
  aliases: ['ss'],
  builder: O.setup.bind(null, [O.HumanizeOption, O.SinceOption, O.TodayOption])
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
    `${C.clText('Total duration')}: ${`[${C.clHighlight(
      U.getDurationLangString(totalDuration, humanize)
    )}]`}`
  )
}

export { handler }
export default {
  ...COMMAND_CONFIG,
  handler
}
