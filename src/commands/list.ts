import parseDate from 'time-speak'
import _isEmpty from 'lodash/isEmpty'

import * as P from '../print'
import * as U from '../utils'
import { findSheet } from '../db'
import { type TimeSheet, type TimeTrackerDB } from '../types'

const COMMAND_CONFIG = {
  command: 'list [sheets..]',
  describe: 'List all time sheet entries',
  alias: 'l',
  builder: {
    sheets: {
      description: 'List of sheet names to list entries from'
    },

    ago: {
      description: 'Print dates as relative time (e.g. 5 minutes ago)',
      type: 'boolean'
    },

    since: {
      description: 'Only list entries since the specified date'
    },

    all: {
      description: 'List all sheets, including inactive ones',
      type: 'boolean'
    }
  }
}

interface ListCommandArgs {
  sheets: string[]
  db: TimeTrackerDB
  ago: boolean
  all: boolean
  since: string
}

const handler = (args: ListCommandArgs) => {
  const { since: inputSince, all, ago, sheets, db } = args
  const { activeSheetName, sheets: dbSheets } = db
  const activeSheet = findSheet(db, activeSheetName)
  const sheetsToList = _isEmpty(sheets)
    ? all
      ? dbSheets
      : [activeSheet]
    : sheets.map((name: string): TimeSheet => findSheet(db, name))

  if (_isEmpty(sheetsToList)) {
    throw new Error('No relevant sheets found')
  }

  const since = _isEmpty(inputSince) ? null : parseDate(inputSince)

  // prettier-ignore
  const filteredSheets =
    since === null
      ? sheetsToList
      : sheetsToList.map((sheet: TimeSheet): TimeSheet => {
        const { entries, ...otherSheetData } = sheet
        const filteredEntries = entries.filter(
          ({ start, end }) => start >= since || end >= since
        )

        return {
          ...otherSheetData,
          entries: filteredEntries
        }
      })

  P.printSummary(filteredSheets, true)
  P.printSheets(filteredSheets, activeSheetName, ago === true)
}

export default {
  ...COMMAND_CONFIG,
  handler: U.cmdHandler(handler)
}
