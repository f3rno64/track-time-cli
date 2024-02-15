import _uniqBy from 'lodash/uniqBy'
import _isUndefined from 'lodash/isUndefined'

import { type BreakdownResults } from '../types'
import { type TimeSheet, type TimeSheetEntry } from '../../../types'

interface PopulateResultsArgs {
  date: Date
  key: string
  duration: number
  sheet: TimeSheet
  entry: TimeSheetEntry
  results: BreakdownResults
}

const populateResults = (args: PopulateResultsArgs): BreakdownResults => {
  const { date, duration, entry, key, results, sheet } = args

  if (_isUndefined(results[key])) {
    results[key] = {
      date,
      duration,
      entries: [entry],
      sheets: [sheet]
    }
  } else {
    const resultEntry = results[key]

    results[key] = {
      ...resultEntry,
      duration: resultEntry.duration + duration,
      entries: _uniqBy([...resultEntry.entries, entry], ({ id }) => id),
      sheets: _uniqBy([...resultEntry.sheets, sheet], ({ name }) => name)
    }
  }

  return results
}

export default populateResults
