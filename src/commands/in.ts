import parseDate from 'time-speak'
import _isEmpty from 'lodash/isEmpty'

import DB from '../db'
import * as P from '../print'
import * as O from '../options'

interface InCommandArgs {
  db: DB
  description: string[]
  sheet?: string
  at?: string
}

const COMMAND_CONFIG = {
  command: 'in <description..>',
  describe: 'Check in to a time sheet',
  aliases: ['i'],
  builder: O.setup.bind(null, [O.AtOption, O.DescriptionOption])
}

const handler = async (args: InCommandArgs) => {
  const { description, at, db } = args
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

export { InCommandArgs, handler }
export default {
  ...COMMAND_CONFIG,
  handler
}
