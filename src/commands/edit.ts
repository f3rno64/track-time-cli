import _isEmpty from 'lodash/isEmpty'
import _isFinite from 'lodash/isFinite'

import * as U from '../utils'
import { type TimeTrackerDB } from '../types'
import { findSheet, findSheetEntry, saveDB } from '../db'

const COMMAND_CONFIG = {
  command: 'edit',
  describe: 'View, modify, or delete a time sheet entry',
  builder: {
    sheet: {
      describe: 'Name of time sheet to edit'
    },

    name: {
      describe: 'New name to apply to specified time sheet'
    },

    entry: {
      describe: 'ID of entry to edit'
    },

    description: {
      describe: 'New description for the specified entry'
    },

    delete: {
      describe: 'Delete the specified time sheet or time sheet entry'
    }
  }
}

interface EntryCommandArguments {
  db: TimeTrackerDB
  sheet: string
  name: string
  entry: string
  description: string
  delete: boolean
}

const handler = async (args: EntryCommandArguments): Promise<void> => {
  const {
    db,
    sheet: inputSheet,
    name: inputName,
    entry: inputEntry,
    description,
    delete: del
  } = args

  if (_isEmpty(inputSheet) && _isEmpty(inputEntry)) {
    throw new Error('No sheet or entry specified')
  }

  if (!_isEmpty(inputSheet)) {
    const sheet = findSheet(db, inputSheet)

    if (typeof sheet === 'undefined') {
      throw new Error(`Sheet ${inputSheet} not found`)
    }

    if (_isFinite(+inputEntry)) {
      const entry = findSheetEntry(db, inputSheet, +inputEntry)

      if (typeof entry === 'undefined') {
        throw new Error(`Entry ${inputEntry} not found in sheet ${inputSheet}`)
      }

      if (del) {
        sheet.entries = sheet.entries.filter((e) => e.id !== entry.id)
        console.log(`Deleted entry ${inputEntry} from sheet ${inputSheet}`)
      } else {
        entry.description = description
        console.log(`Updated entry ${inputEntry} in sheet ${inputSheet}`)
      }
    } else {
      if (_isEmpty(inputName)) {
        throw new Error('No new name specified')
      }

      if (del) {
        db.sheets = db.sheets.filter((s) => s.name !== inputSheet)
        console.log(`Deleted sheet ${inputSheet}`)
      } else {
        sheet.name = inputName
        console.log(`Renamed sheet ${inputSheet} to ${inputName}`)
      }
    }

    await saveDB(db)
  }
}

export default {
  ...COMMAND_CONFIG,
  handler: U.cmdHandler(handler)
}
