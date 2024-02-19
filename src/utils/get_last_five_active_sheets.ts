import _last from 'lodash/last'
import _isUndefined from 'lodash/isUndefined'

import { type TimeSheet, type TimeSheetEntry } from '../types'

const getLastFiveActiveSheets = (sheets: TimeSheet[]): TimeSheet[] => {
  const sheetsToSort = [...sheets]

  sheetsToSort.sort(({ entries: entriesA }, { entries: entriesB }): number => {
    const lastEntryA: TimeSheetEntry | undefined = _last(entriesA)
    const lastEntryB: TimeSheetEntry | undefined = _last(entriesB)

    return _isUndefined(lastEntryA) || _isUndefined(lastEntryB)
      ? 0
      : +lastEntryB.start - +lastEntryA.start
  })

  return sheetsToSort.slice(0, 5)
}

export default getLastFiveActiveSheets
