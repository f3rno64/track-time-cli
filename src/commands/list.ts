import _sum from 'lodash/sum'
import _isEmpty from 'lodash/isEmpty'
import _flatten from 'lodash/flatten'
import formatDuration from 'format-duration'
import _flattenDeep from 'lodash/flattenDeep'

import * as C from '../color'
import * as P from '../print'
import cmdHandler from '../utils/cmd_handler'
import { findSheet } from '../db'
import {
  type TimeSheet,
  type TimeSheetEntry,
  type TimeTrackerDB
} from '../types'

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
  const { sheets: dbSheets } = db
  const sheetsToList = _isEmpty(sheets)
    ? dbSheets
    : sheets.map((name: string): TimeSheet => findSheet(db, name))

  if (_isEmpty(sheetsToList)) {
    console.error(C.clError('No available sheets'))
    return
  }

  sheetsToList.forEach((sheet: TimeSheet, i: number): void => {
    const { activeEntryID, name, entries } = sheet

    if (entries.length > 0) {
      const totalSheetDuration = _sum(
        entries.map(
          ({ start, end }) => (end === null ? Date.now() : +end) - +start
        )
      )

      console.log(
        `${C.clText('- Sheet')} ${C.clSheet(name)} [${C.clHighlight(
          'duration:'
        )} ${C.clDuration(`${formatDuration(totalSheetDuration)}`)}]`
      )

      entries.forEach((entry: TimeSheetEntry): void => {
        const { id } = entry

        P.printSheetEntry(entry, id === activeEntryID)
      })
    } else {
      console.log(
        `${C.clHighlight('Sheet')} ${C.clSheet(name)} ${C.clHighlight(
          'has no entries'
        )}`
      )
    }

    if (i < sheetsToList.length - 1) {
      console.log('')
    }
  })

  const totalEntries = _flatten(
    sheetsToList.map(({ entries }) => entries)
  ).length

  const totalSheetDuration = formatDuration(
    _sum(
      _flattenDeep(
        sheetsToList.map(({ entries }) =>
          entries.map(
            ({ start, end }): number =>
              (end === null ? Date.now() : +end) - +start
          )
        )
      )
    )
  )

  console.log('')
  console.log(
    `${C.clText('- Total duration:')} ${C.clDuration(totalSheetDuration)}`
  )
  console.log(
    `${C.clText('- Total entries:')} ${C.clHighlight(`${totalEntries}`)}`
  )
}

export default {
  ...COMMAND_CONFIG,
  handler: cmdHandler(handler)
}
