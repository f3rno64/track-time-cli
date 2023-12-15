import _isFinite from 'lodash/isFinite'

import { type TimeSheet, type TimeSheetEntry } from '../types'

const removeEntry = (
  sheet: TimeSheet,
  entry: TimeSheetEntry | number
): TimeSheet => {
  sheet.entries = sheet.entries.filter(({ id }) =>
    _isFinite(entry)
      ? id !== (entry as number)
      : id !== (entry as TimeSheetEntry).id
  )

  return sheet
}

export default removeEntry
