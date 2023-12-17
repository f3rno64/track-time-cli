import DB from '../db'
import * as P from '../print'
import * as O from '../options'

const COMMAND_CONFIG = {
  command: ['now', '$0'],
  describe: 'Display all active time sheet entries',
  aliases: ['n'],
  builder: O.setup.bind(null, [O.HumanizeOption])
}

interface NowCommandArguments {
  db: DB
  humanize?: boolean
}

const handler = (args: NowCommandArguments) => {
  const { humanize, db } = args
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

  P.printActiveSheetEntry(entry, activeSheetName, humanize)
}

export { handler }
export default {
  ...COMMAND_CONFIG,
  handler
}
