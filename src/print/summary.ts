import _sum from 'lodash/sum'
import _isArray from 'lodash/isArray'

import log from '../log'
import * as C from '../color'
import * as U from '../utils'
import { type TimeSheet } from '../types'

/**
 * NOTE: The `appendEmptyLine` arg allows print logic lacking explicit
 * newlines, making things neater.
 */
const printSummary = (
  sheets: TimeSheet | TimeSheet[],
  humanize?: boolean
): void => {
  const totalDuration = U.getTotalSheetDuration(sheets)
  const totalEntries = _isArray(sheets)
    ? _sum(sheets.map((sheet) => sheet.entries.length))
    : sheets.entries.length

  const sheetCount = _isArray(sheets) ? sheets.length : 1
  const uiTotalDuration = C.clDuration(
    `[${U.getDurationLangString(totalDuration, humanize)}]`
  )
  const uiTotalSheets = C.clHighlight(`${sheetCount} sheets`)
  const uiTotalEntries = C.clHighlight(`${totalEntries} entries`)

  log(
    `${C.clText('* Summary:')} ${uiTotalSheets}${C.clHighlight(
      ','
    )} ${uiTotalEntries} ${uiTotalDuration}`
  )
}

export default printSummary
