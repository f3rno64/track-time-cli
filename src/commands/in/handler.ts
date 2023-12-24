import parseDate from 'time-speak'
import _isEmpty from 'lodash/isEmpty'

import * as P from '../../print'

import { type InCommandArgs } from './types'

const handler = async (args: InCommandArgs) => {
  const { help, yargs, description, at, db } = args

  if (help) {
    yargs.showHelp()
    process.exit(0)
  }

  const finalDescription = description.join(' ')
  const activeSheetName = db.getActiveSheetName()

  if (activeSheetName === null) {
    throw new Error('No active sheet')
  }

  const sheet = db.getSheet(activeSheetName)
  const { name, activeEntryID } = sheet

  if (activeEntryID !== null) {
    const entry = db.getSheetEntry(name, activeEntryID)
    const { id, description: entryDescription } = entry

    throw new Error(`An entry is already active (${id}): ${entryDescription}`)
  }

  const startDate = _isEmpty(at) ? new Date() : parseDate(at)
  const entry = await db.addActiveSheetEntry(name, finalDescription, startDate)

  P.printCheckedInEntry(entry)
}

export default handler
