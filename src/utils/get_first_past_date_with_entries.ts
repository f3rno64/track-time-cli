import _flatMap from 'lodash/flatMap'
import _isUndefined from 'lodash/isUndefined'

import { getPastDay, getStartOfDay } from '../dates'
import { type TimeSheet, type TimeSheetEntry } from '../types'

const MIN_ENTRY_COUNT_FOR_DEFAULT_SINCE_DATE = 25

const getFirstPastDateWithEntries = (sheets: TimeSheet[]): Date | null => {
  const entries: TimeSheetEntry[] = _flatMap(sheets, 'entries')

  entries.sort((a, b) => +b.start - +a.start)

  const { start } =
    entries[
      Math.min(entries.length - 1, MIN_ENTRY_COUNT_FOR_DEFAULT_SINCE_DATE)
    ] ?? {}

  return _isUndefined(start)
    ? getStartOfDay(getPastDay(1))
    : getStartOfDay(start)
}

export default getFirstPastDateWithEntries
