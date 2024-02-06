import _sum from 'lodash/sum'
import _isArray from 'lodash/isArray'

import { type TimeSheet } from '../types'

const getTotalSheetDuration = (sheet: TimeSheet | TimeSheet[]): number => {
  if (_isArray(sheet)) {
    return _sum(sheet.map(getTotalSheetDuration))
  }

  const { entries } = sheet

  return (
    _sum(entries.map(({ end, start }) => (end === null ? 0 : +end - +start))) ??
    0
  )
}

export default getTotalSheetDuration
