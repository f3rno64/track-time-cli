import _isUndefined from 'lodash/isUndefined'

import { isEntryInDay } from '../utils'
import { type TimeSheet, type TimeSheetEntry } from '../types'

const filterSheetEntriesForDate = (
  sheets: TimeSheet[],
  date: Date
): TimeSheet[] =>
  sheets
    .map(({ activeEntryID, entries, ...otherSheetData }) => {
      const newEntries = entries.filter((entry: TimeSheetEntry): boolean =>
        isEntryInDay(date, entry)
      )

      const isActiveEntryInNewEntries = !_isUndefined(
        newEntries.find(({ id }) => id === activeEntryID)
      )

      return {
        ...otherSheetData,
        activeEntryID: isActiveEntryInNewEntries ? activeEntryID : null,
        entries: newEntries
      }
    })
    .filter(({ entries }) => entries.length > 0)

export default filterSheetEntriesForDate
