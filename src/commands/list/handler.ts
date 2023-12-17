import sAgo from 's-ago'
import _sum from 'lodash/sum'
import parseDate from 'time-speak'
import _isEmpty from 'lodash/isEmpty'

import log from '../../log'
import * as C from '../../color'
import * as U from '../../utils'
import * as P from '../../print'
import * as D from '../../dates'
import { type TimeSheet } from '../../types'
import { type ListCommandArgs } from './types'

const handler = (args: ListCommandArgs) => {
  const {
    yesterday,
    humanize,
    today,
    since,
    all,
    ago,
    sheets: sheetNames,
    db
  } = args

  if (!_isEmpty(since) && (today || yesterday)) {
    throw new Error('Cannot use --since, --today, and --yesterday together')
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
      ? D.getStartOfDayDate()
      : yesterday
        ? D.getStartOfDayDate(new Date(Date.now() - D.getDaysMS(1)))
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

    const totalDurationUI = U.getDurationLangString(totalDuration, humanize)

    log('')
    log(
      `${C.clText('* Total duration:')} ${C.clDuration(`[${totalDurationUI}]`)}`
    )
  }
}

export default handler
