import parseDate from 'time-speak'
import _isEmpty from 'lodash/isEmpty'
import _isUndefined from 'lodash/isUndefined'

import * as C from '../color'
import * as P from '../print'
import * as U from '../utils'
import { type TimeTrackerDB } from '../types'
import { findSheet, findSheetEntry, saveDB } from '../db'

interface InCommandArgs {
  description: string[]
  sheet: string
  at: string
  db: TimeTrackerDB
}

const COMMAND_CONFIG = {
  command: 'in [options] <description..>',
  describe: 'Check in to a time sheet',
  builder: {
    at: {
      describe: 'Check in at a specific time'
    },

    sheet: {
      describe: 'Name of sheet to check in to',
      default: ''
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
  const sheet = findSheet(db, activeSheetName)

  if (typeof sheet === 'undefined') {
    console.log(C.clError('No active sheet'))
    return
  }

  const { name, activeEntryID } = sheet

  if (activeEntryID !== null) {
    const entry = findSheetEntry(db, name, activeEntryID)

    if (_isUndefined(entry)) {
      throw new Error(
        `${C.clText('Sheet')} ${C.clSheet(name)} ${C.clText(
          'has no active entry with id'
        )} ${C.clID(activeEntryID)}`
      )
    }

    const { id, description: entryDescription } = entry

    console.log(
      `${C.clHighlight('An entry is already active:')} [${C.clID(
        `${id}`
      )}] ${C.clText(entryDescription)}`
    )

    return
  }

  const atDate = _isEmpty(at) ? new Date() : parseDate(at)
  const entry = {
    id: sheet.entries.length,
    start: atDate,
    end: null,
    description: finalDescription
  }

  sheet.entries = [...sheet.entries, entry]
  sheet.activeEntryID = entry.id

  await saveDB(db)

  P.printCheckedInEntry(entry)
}

export default {
  ...COMMAND_CONFIG,
  handler: U.cmdHandler(handler)
}
