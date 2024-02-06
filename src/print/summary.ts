import _isArray from 'lodash/isArray'
import _sum from 'lodash/sum'

import { clDuration, clHighlight, clText } from '../color'
import log from '../log'
import { type TimeSheet } from '../types'
import { getDurationLangString, getTotalSheetDuration } from '../utils'

/**
 * NOTE: The `appendEmptyLine` arg allows print logic lacking explicit
 * newlines, making things neater.
 */
const printSummary = (
  sheets: TimeSheet | TimeSheet[],
  humanize?: boolean
): void => {
  const totalDuration = getTotalSheetDuration(sheets)
  const totalEntries = _isArray(sheets)
    ? _sum(sheets.map((sheet) => sheet.entries.length))
    : sheets.entries.length

  const sheetCount = _isArray(sheets) ? sheets.length : 1
  const uiTotalDuration = clDuration(
    `[${getDurationLangString(totalDuration, humanize)}]`
  )
  const uiTotalSheets = clHighlight(`${sheetCount} sheets`)
  const uiTotalEntries = clHighlight(`${totalEntries} entries`)

  log(
    `${clText('* Summary:')} ${uiTotalSheets}${clHighlight(
      ','
    )} ${uiTotalEntries} ${uiTotalDuration}`
  )
}

export default printSummary
