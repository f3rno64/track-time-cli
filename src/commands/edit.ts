import parseDate from 'time-speak'
import _isEmpty from 'lodash/isEmpty'
import _isFinite from 'lodash/isFinite'

import log from '../log'
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

interface EditCommandArguments {
  db: TimeTrackerDB
  sheet?: string
  name?: string
  entry?: string
  description?: string
  delete?: boolean
  start?: string
  end?: string
}

const handler = async (args: EditCommandArguments): Promise<void> => {
  const {
    db,
    sheet: inputSheet,
    name: inputName,
    entry: inputEntry,
    description,
    delete: del,
    start,
    end
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
        log(`Deleted entry ${inputEntry} from sheet ${inputSheet}`)
      } else if (!_isEmpty(description)) {
        entry.description = description
        log(`Updated entry ${inputEntry} in sheet ${inputSheet}`)
      } else if (!_isEmpty(start)) {
        const startDate = parseDate(start)
        entry.start = startDate
        log(
          `Updated entry ${inputEntry} start date to ${startDate.toLocaleString()}`
        )
      } else if (!_isEmpty(end)) {
        const endDate = parseDate(end)
        entry.end = endDate
        log(
          `Updated entry ${inputEntry} end date to ${endDate.toLocaleString()}`
        )
      }
    } else {
      if (del) {
        db.sheets = db.sheets.filter((s) => s.name !== inputSheet)
        log(`Deleted sheet ${inputSheet}`)
      } else if (!_isEmpty(inputName)) {
        sheet.name = inputName
        log(`Renamed sheet ${inputSheet} to ${inputName}`)
      } else {
        throw new Error('No new name specified')
      }
    }

    await saveDB(db)
  }
}

export { handler, COMMAND_CONFIG, type EditCommandArguments }
export default {
  ...COMMAND_CONFIG,
  handler: U.cmdHandler(handler)
}
