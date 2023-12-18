import * as U from '../utils'
import { type TimeSheet } from '../types'

const filterSheetEntriesForDate = (
  sheets: TimeSheet[],
  date: Date
): TimeSheet[] =>
  sheets
    .map(({ activeEntryID, entries, ...otherSheetData }) => {
      const newEntries = entries.filter(U.isEntryInDay.bind(null, date))
      const isActiveEntryInNewEntries =
        typeof newEntries.find(({ id }) => id === activeEntryID) !== 'undefined'

      return {
        ...otherSheetData,
        entries: newEntries,
        activeEntryID: isActiveEntryInNewEntries ? activeEntryID : null
      }
    })
    .filter(({ entries }) => entries.length > 0)

export default filterSheetEntriesForDate
