import _sum from 'lodash/sum'
import _isArray from 'lodash/isArray'
import formatDuration from 'format-duration'

import * as C from '../color'
import { type TimeSheet } from '../types'
import { getTotalSheetDuration } from '../sheets'

const printSummary = (sheets: TimeSheet | TimeSheet[]): void => {
  const totalDuration = getTotalSheetDuration(sheets)
  const totalEntries = _isArray(sheets)
    ? _sum(sheets.map((sheet) => sheet.entries.length))
    : sheets.entries.length

  const uiTotalDuration = C.clDuration(`[${formatDuration(totalDuration)}]`)
  const uiTotalEntries = C.clHighlight(`${totalEntries} entries`)

  console.log(`${C.clText('Summary:')} ${uiTotalEntries} ${uiTotalDuration}`)
}

export default printSummary
