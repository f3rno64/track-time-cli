import sAgo from 's-ago'
import _sum from 'lodash/sum'
import parseDate from 'time-speak'
import _isEmpty from 'lodash/isEmpty'
import _isUndefined from 'lodash/isUndefined'

import log from '../../log'
import { printSheets } from '../../print'
import { type TimeSheet } from '../../types'
import { type ListCommandArgs } from './types'
import { getPastDay, getStartOfDay } from '../../dates'
import {
  clDate,
  clDuration,
  clHighlight,
  clHighlightRed,
  clText
} from '../../color'

import {
  getDurationLangString,
  getFirstPastDateWithEntries,
  getSheetsWithEntriesSinceDate
} from '../../utils'

// eslint-disable-next-line sonarjs/cognitive-complexity
const handler = (args: ListCommandArgs): void => {
  const {
    db,
    all,
    help,
    since,
    today,
    yargs,
    filter,
    concise,
    humanize,
    absolute,
    yesterday,
    allSheets,
    sheets: sheetNames
  } = args

  if (help) {
    yargs.showHelp()
    process.exit(0)
  }

  if (!_isEmpty(since) && (today || yesterday || all)) {
    throw new Error(
      'Cannot use --since, --today, --yesterday, or --all together'
    )
  }

  const activeSheetName = db.getActiveSheetName()
  const dbSheets = db.getAllSheets()

  // prettier-ignore
  const sheetsToList: TimeSheet[] = !_isUndefined(sheetNames)
    ? sheetNames.map((sheetName: string): TimeSheet => db.getSheet(sheetName))
    : allSheets
      ? dbSheets
      : activeSheetName === null
        ? []
        : [db.getActiveSheet()]

  if (_isEmpty(sheetsToList)) {
    throw new Error('No relevant sheets found')
  }

  const sinceDate =
    !_isUndefined(since) && !_isEmpty(since)
      ? new Date(+parseDate(since))
      : today
        ? getStartOfDay()
        : yesterday
          ? getStartOfDay(getPastDay(1))
          : all
            ? new Date(0)
            : getFirstPastDateWithEntries(sheetsToList)

  const sheetsFilteredByDate =
    sinceDate === null
      ? sheetsToList
      : getSheetsWithEntriesSinceDate(sheetsToList, sinceDate)

  // TODO: Extract
  const filteredSheets = sheetsFilteredByDate
    .map(({ entries, ...otherSheetData }) => ({
      ...otherSheetData,
      entries: entries.filter(({ description }) =>
        _isUndefined(filter) || _isEmpty(filter)
          ? true
          : description.toLowerCase().includes(filter.toLowerCase())
      )
    }))
    .filter(({ entries }) => entries.length > 0)

  if (today) {
    log(
      `${clText('* Showing')} ${clHighlight(
        `${filteredSheets.length}`
      )} ${clText('sheets for today')}`
    )
  } else if (sinceDate !== null) {
    log(
      `${clText('* Showing sheets since')} ${clHighlight(
        sinceDate.toLocaleString()
      )} ${clDate(`[${sAgo(sinceDate)}]`)}`
    )
  } else {
    log(
      `${clText('* Showing')} ${clHighlight(
        `${filteredSheets.length}`
      )} ${clText('sheets')}`
    )
  }

  log('')

  printSheets(filteredSheets, absolute !== true, humanize, concise)

  if (!all) {
    const sheetsNotShownCount = dbSheets.length - filteredSheets.length

    log('')
    log(
      `${clText('*')} ${clHighlightRed(
        `${sheetsNotShownCount}`
      )} ${clText('Sheets not shown')}. ${clText('use')} ${clHighlightRed(
        '--all'
      )} ${clText('to show')}`
    )
  } else {
    const totalDuration = _sum(
      filteredSheets.map(({ entries }) =>
        _sum(
          entries.map(({ end, start }) =>
            end === null ? Date.now() - +start : +end - +start
          )
        )
      )
    )

    const totalDurationUI = getDurationLangString(totalDuration, humanize)

    log('')
    log(`${clText('* Total duration:')} ${clDuration(`[${totalDurationUI}]`)}`)
  }
}

export default handler
