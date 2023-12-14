import parseDate from 'time-speak'
import _isEmpty from 'lodash/isEmpty'
import _compact from 'lodash/compact'

import log from '../log'
import * as C from '../color'
import * as P from '../print'
import { findSheet } from '../db'
import { type TimeSheet, type TimeTrackerDB } from '../types'

const COMMAND_CONFIG = {
  command: 'list [sheets..]',
  describe: 'List all time sheet entries',
  aliases: ['l'],
  builder: {
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

  // prettier-ignore
  const sheetsToList: TimeSheet[] = _isEmpty(sheets)
    ? all
      ? dbSheets
      : activeSheetName === null
        ? []
        : _compact([findSheet(db, activeSheetName)])
    : _compact(
      sheets.map((name: string): TimeSheet | undefined => findSheet(db, name))
    )

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
          ({ start }) => start >= since
        )

        return {
          ...otherSheetData,
          entries: filteredEntries
        } as TimeSheet
      })

  P.printSummary(filteredSheets, true)
  P.printSheets(filteredSheets, ago === true)

  if (!all) {
    const sheetsNotShownCount = dbSheets.length - filteredSheets.length

    log('')
    log(
      `  ${C.clHighlightRed(`${sheetsNotShownCount}`)} ${C.clText(
        'Sheets not shown'
      )}. ${C.clText('use --all to show')}`
    )
  }
}

export default {
  ...COMMAND_CONFIG,
  handler
}
