import parseDate from 'time-speak'
import _isEmpty from 'lodash/isEmpty'
import _isUndefined from 'lodash/isUndefined'

import { printCheckedInEntry } from '../../print'
import { type InCommandArgs } from './types'

const handler = async (args: InCommandArgs): Promise<void> => {
  const { at, db, description, help, yargs } = args

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
  const { activeEntryID, name } = sheet

  if (activeEntryID !== null) {
    const entry = db.getSheetEntry(name, activeEntryID)
    const { description: entryDescription, id } = entry

    throw new Error(`An entry is already active (${id}): ${entryDescription}`)
  }

  const startDate =
    _isUndefined(at) || _isEmpty(at) ? new Date() : new Date(+parseDate(at))

  const entry = await db.addActiveSheetEntry(name, finalDescription, startDate)

  printCheckedInEntry(entry)
}

export default handler
