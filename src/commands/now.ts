import * as P from '../print'
import { findSheet } from '../db'
import { type TimeTrackerDB } from '../types'

const COMMAND_CONFIG = {
  command: ['now', '$0'],
  describe: 'Display all active time sheet entries',
  aliases: ['n']
}

interface NowCommandArguments {
  db: TimeTrackerDB
}

const handler = (args: NowCommandArguments) => {
  const { db } = args
  const { activeSheetName } = db

  if (activeSheetName === null) {
    throw new Error('No sheet is active')
  }

  const sheet = findSheet(db, activeSheetName)

  if (typeof sheet === 'undefined') {
    throw new Error(`Acive sheet ${activeSheetName} not found`)
  }

  const { activeEntryID, entries } = sheet

  if (activeEntryID === null) {
    throw new Error(`Sheet ${activeSheetName} has no active entry`)
  }

  const entry = entries.find(({ id }) => id === activeEntryID)

  if (typeof entry === 'undefined') {
    throw new Error(
      `Active entry ${activeEntryID} for sheet ${activeSheetName} not found`
    )
  }

  P.printActiveSheetEntry(entry, activeSheetName)
}

export { handler }
export default {
  ...COMMAND_CONFIG,
  handler
}
