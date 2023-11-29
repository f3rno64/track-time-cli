import _max from 'lodash/max'

import findSheet from './find_sheet'
import { type TimeTrackerDB, type TimeSheet } from '../types'

const findLastActiveSheet = (db: TimeTrackerDB): TimeSheet | null => {
  const { sheets } = db
  const results = sheets.map(({ name, entries }) => ({
    name,
    maxStart: _max(entries.map(({ start }) => +start))
  }))

  results.sort(({ maxStart: a }, { maxStart: b }) => +b - +a)

  const [lastActiveResult] = results
  const { name } = lastActiveResult

  return findSheet(db, name)
}

export default findLastActiveSheet
