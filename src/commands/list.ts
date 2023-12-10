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
    }
  }
}

interface ListCommandArgs {
  sheets: string[]
  db: TimeTrackerDB
  ago: boolean
}

const handler = (args: ListCommandArgs) => {
  const { ago, sheets, db } = args
  const { activeSheetName, sheets: dbSheets } = db
  const sheetsToList = _isEmpty(sheets)
    ? dbSheets
    : sheets.map((name: string): TimeSheet => findSheet(db, name))

  if (_isEmpty(sheetsToList)) {
    throw new Error('No sheets')
  }

  P.printSummary(sheetsToList, true)
  P.printSheets(sheetsToList, activeSheetName, ago === true)
}

export default {
  ...COMMAND_CONFIG,
  handler: U.cmdHandler(handler)
}
