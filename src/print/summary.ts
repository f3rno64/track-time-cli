import _sum from 'lodash/sum'
import _isArray from 'lodash/isArray'
import formatDuration from 'format-duration'

import log from '../log'
import * as C from '../color'
import { type TimeSheet } from '../types'
import { getTotalSheetDuration } from '../sheets'

/**
 * NOTE: The `appendEmptyLine` arg allows print logic lacking explicit
 * newlines, making things neater.
 */
const printSummary = (
  sheets: TimeSheet | TimeSheet[],
  appendEmptyLine?: boolean
): void => {
  const totalDuration = getTotalSheetDuration(sheets)
  const totalEntries = _isArray(sheets)
    ? _sum(sheets.map((sheet) => sheet.entries.length))
    : sheets.entries.length

  const sheetCount = _isArray(sheets) ? sheets.length : 1
  const uiTotalDuration = C.clDuration(`[${formatDuration(totalDuration)}]`)
  const uiTotalSheets = C.clHighlight(`${sheetCount} sheets`)
  const uiTotalEntries = C.clHighlight(`${totalEntries} entries`)

  log(
    `${C.clText('* Summary:')} ${uiTotalSheets}${C.clHighlight(
      ','
    )} ${uiTotalEntries} ${uiTotalDuration}`
  )

  if (appendEmptyLine === true) {
    log('')
  }
}

export default printSummary
