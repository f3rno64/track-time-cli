import _isUndefined from 'lodash/isUndefined'

import { type NowCommandArgs } from './types'
import { printActiveSheetEntry } from '../../print'

const handler = (args: NowCommandArgs): void => {
  const { db, help, humanize, yargs } = args

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

  if (_isUndefined(entry)) {
    throw new Error(
      `Active entry ${activeEntryID} for sheet ${activeSheetName} not found`
    )
  }

  printActiveSheetEntry(entry, activeSheetName, humanize)
}

export default handler
