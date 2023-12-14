import parseDate from 'time-speak'
import _isEmpty from 'lodash/isEmpty'

import * as P from '../print'
import { genSheetEntry } from '../sheets'
import { type TimeTrackerDB } from '../types'
import { findSheet, findSheetEntry, saveDB } from '../db'

interface InCommandArgs {
  description: string[]
  sheet?: string
  at?: string
  db: TimeTrackerDB
}

const COMMAND_CONFIG = {
  command: 'in <description..>',
  describe: 'Check in to a time sheet',
  builder: {
    at: {
      describe: 'Check in at a specific time'
    },

    description: {
      describe: 'Time sheet entry description',
      demandOption: true
    }
  }
}

const handler = async (args: InCommandArgs) => {
  const { description, at, db } = args
  const finalDescription = description.join(' ')
  const { activeSheetName } = db

  if (activeSheetName === null) {
    throw new Error('No active sheet')
  }

  const sheet = findSheet(db, activeSheetName)

  if (typeof sheet === 'undefined') {
    throw new Error('No active sheet')
  }

  const { name, entries, activeEntryID } = sheet

  if (activeEntryID !== null) {
    const entry = findSheetEntry(db, name, activeEntryID)

    if (typeof entry === 'undefined') {
      throw new Error(`Sheet ${name} has no entry with ID ${activeEntryID}`)
    }

    const { id, description: entryDescription } = entry

    throw new Error(`An entry is already active (${id}): ${entryDescription}`)
  }

  const startDate = _isEmpty(at) ? new Date() : parseDate(at)
  const entry = genSheetEntry(entries.length, finalDescription, startDate)

  sheet.entries = [...sheet.entries, entry]
  sheet.activeEntryID = entry.id

  await saveDB(db)

  P.printCheckedInEntry(entry)
}

export { InCommandArgs, handler }
export default {
  ...COMMAND_CONFIG,
  handler
}
