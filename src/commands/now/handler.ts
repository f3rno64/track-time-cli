import * as P from '../../print'
import { type NowCommandArgs } from './types'

const handler = (args: NowCommandArgs) => {
  const { yargs, help, humanize, db } = args

  if (help) {
    yargs.showHelp()
    process.exit(0)
  }

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

export default handler
