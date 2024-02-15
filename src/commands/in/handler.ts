import parseDate from 'time-speak'
import _isEmpty from 'lodash/isEmpty'
import _isUndefined from 'lodash/isUndefined'

import { type InCommandArgs } from './types'
import { printCheckedInEntry } from '../../print'

const handler = async (args: InCommandArgs): Promise<void> => {
  const { yargs, db, help } = args

  if (help) {
    yargs.showHelp()
    process.exit(0)
  }

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

  // TODO: Rename description to input or content (or think of a better name)
  const { at, description: inputArray } = args
  const input = inputArray.join(' ')
  const startDate =
    _isUndefined(at) || _isEmpty(at) ? new Date() : new Date(+parseDate(at))

  const entry = await db.addActiveSheetEntry({ sheet: name, input, startDate })

  printCheckedInEntry(entry)
}

export default handler
