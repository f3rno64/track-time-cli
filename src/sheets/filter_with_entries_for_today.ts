import * as E from '../entries'
import { type TimeSheet } from '../types'

const filterWithEntriesForToday = (sheets: TimeSheet[]): TimeSheet[] =>
  sheets
    .map(({ entries, ...otherSheetData }) => ({
      entries: entries.filter(E.isEntryToday),
      ...otherSheetData
    }))
    .filter(({ entries }) => entries.length > 0)

export default filterWithEntriesForToday
