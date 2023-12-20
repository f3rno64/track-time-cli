import _uniqBy from 'lodash/uniqBy'

import {
  type TimeSheet,
  type TimeSheetEntry,
  type BreakdownResults
} from '../../../types'

interface PopulateResultsArgs {
  results: BreakdownResults
  key: string
  date: Date
  duration: number
  sheet: TimeSheet
  entry: TimeSheetEntry
}

const populateResults = (args: PopulateResultsArgs): BreakdownResults => {
  const { results, key, date, duration, sheet, entry } = args

  if (typeof results[key] === 'undefined') {
    results[key] = {
      date,
      duration,
      sheets: [sheet],
      entries: [entry]
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
