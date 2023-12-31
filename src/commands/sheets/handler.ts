import ago from 's-ago'
import _sum from 'lodash/sum'
import parseDate from 'time-speak'
import _isEmpty from 'lodash/isEmpty'

import log from '../../log'
import * as D from '../../dates'
import * as U from '../../utils'
import * as P from '../../print'
import * as C from '../../color'
import { type TimeSheet } from '../../types'
import { type SheetsCommandArgs } from './types'

const handler = async (args: SheetsCommandArgs) => {
  const { yargs, help, today, since, humanize, db } = args

  if (help) {
    yargs.showHelp()
    process.exit(0)
  }

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
      ? D.getStartOfDay()
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

export default handler
