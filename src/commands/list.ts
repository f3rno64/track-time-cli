import _isEmpty from 'lodash/isEmpty'

import * as C from '../color'
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
    }
  }
}

interface ListCommandArgs {
  sheets: string[]
  db: TimeTrackerDB
}

const handler = (args: ListCommandArgs) => {
  const { sheets, db } = args
  const { activeSheetName, sheets: dbSheets } = db
  const sheetsToList = _isEmpty(sheets)
    ? dbSheets
    : sheets.map((name: string): TimeSheet => findSheet(db, name))

  if (_isEmpty(sheetsToList)) {
    console.error(C.clError('No available sheets'))
    return
  }

  sheetsToList.forEach((sheet: TimeSheet, i: number): void => {
    P.printSheet(sheet, sheet.name === activeSheetName)

    if (i < sheetsToList.length - 1) {
      console.log('')
    }
  })

  console.log('')
  P.printSummary(sheetsToList)
}

export default {
  ...COMMAND_CONFIG,
  handler: U.cmdHandler(handler)
}
