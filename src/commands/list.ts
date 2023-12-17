import sAgo from 's-ago'
import _sum from 'lodash/sum'
import parseDate from 'time-speak'
import _isEmpty from 'lodash/isEmpty'
import formatDuration from 'format-duration'
import humanizeDuration from 'humanize-duration'

import DB from '../db'
import log from '../log'
import * as C from '../color'
import * as P from '../print'
import * as U from '../utils'
import * as O from '../options'
import { type TimeSheet } from '../types'

const COMMAND_CONFIG = {
  command: 'list [sheets..]',
  describe: 'List all time sheet entries',
  aliases: ['l'],
  builder: O.setup.bind(null, [
    O.SheetsOption,
    O.AgoOption,
    O.HumanizeOption,
    O.SinceOption,
    O.TodayOption,
    O.AllOption
  ])
}

interface ListCommandArgs {
  db: DB
  sheets?: string[]
  ago?: boolean
  all?: boolean
  since?: string
  today?: boolean
  humanize?: boolean
}

const handler = (args: ListCommandArgs) => {
  const { humanize, today, since, all, ago, sheets: sheetNames, db } = args

  if (!_isEmpty(since) && today) {
    throw new Error('Cannot use both --since and --today')
  }

  const activeSheetName = db.getActiveSheetName()
  const dbSheets = db.getAllSheets()

  // prettier-ignore
  const sheetsToList: TimeSheet[] = typeof sheetNames !== 'undefined'
    ? sheetNames.map(db.getSheet)
    : all
      ? dbSheets
      : activeSheetName === null
        ? []
        : [db.getActiveSheet()]

  if (_isEmpty(sheetsToList)) {
    throw new Error('No relevant sheets found')
  }

  // prettier-ignore
  const sinceDate = !_isEmpty(since)
    ? parseDate(since)
    : today
      ? U.getStartDate()
      : null

  const filteredSheets =
    sinceDate === null
      ? sheetsToList
      : U.getSheetsWithEntriesSinceDate(sheetsToList, sinceDate)

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
      )} ${C.clDate(`[${sAgo(sinceDate)}]`)}`
    )
  } else {
    log(
      `${C.clText('* Showing')} ${C.clHighlight(
        `${filteredSheets.length}`
      )} ${C.clText('sheets')}`
    )
  }

  log('')

  P.printSheets(filteredSheets, ago === true, humanize)

  if (!all) {
    const sheetsNotShownCount = dbSheets.length - filteredSheets.length

    log('')
    log(
      `${C.clText('*')} ${C.clHighlightRed(
        `${sheetsNotShownCount}`
      )} ${C.clText('Sheets not shown')}. ${C.clText('use')} ${C.clHighlightRed(
        '--all'
      )} ${C.clText('to show')}`
    )
  } else {
    const totalDuration = _sum(
      filteredSheets.map(({ entries }) =>
        _sum(
          entries.map(({ start, end }) =>
            end === null ? Date.now() - +start : +end - +start
          )
        )
      )
    )

    const totalDurationUI = humanize
      ? humanizeDuration(totalDuration)
      : formatDuration(totalDuration)

    log('')
    log(
      `${C.clText('* Total duration:')} ${C.clDuration(`[${totalDurationUI}]`)}`
    )
  }
}

export default {
  ...COMMAND_CONFIG,
  handler
}
