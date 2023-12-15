import DB from '../db'
import * as P from '../print'

const COMMAND_CONFIG = {
  command: ['now', '$0'],
  describe: 'Display all active time sheet entries',
  aliases: ['n']
}

interface NowCommandArguments {
  db: DB
}

const handler = (args: NowCommandArguments) => {
  const { db } = args
  const activeSheetName = db.getActiveSheetName()

  if (activeSheetName === null) {
    throw new Error('No sheet is active')
  }

  const sheet = db.getActiveSheet()
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
