import _isUndefined from 'lodash/isUndefined'

import findSheet from './find_sheet'
import { type TimeTrackerDB, type TimeSheetEntry } from '../types'

const findSheetEntry = (
  db: TimeTrackerDB,
  sheetName: string,
  id: number
): TimeSheetEntry | undefined => {
  const sheet = findSheet(db, sheetName)

  if (_isUndefined(sheet)) {
    throw new Error(`Sheet ${sheetName} does not exist`)
  }

  const { entries } = sheet

  return entries.find(({ id: entryID }) => entryID === id)
}

export default findSheetEntry
