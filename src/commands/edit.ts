import parseDate from 'time-speak'
import _isEmpty from 'lodash/isEmpty'
import _isArray from 'lodash/isArray'
import _isFinite from 'lodash/isFinite'

import log from '../log'
import * as C from '../color'
import { type TimeTrackerDB } from '../types'
import { findSheet, findSheetEntry, saveDB } from '../db'

const COMMAND_CONFIG = {
  command: 'edit [description..]',
  describe: 'View, modify, or delete a time sheet entry',
  aliases: ['e'],
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
    description: inputDescription,
    sheet: inputSheet,
    entry: inputEntry,
    name: inputName,
    delete: del,
    start,
    db,
    end
  } = args

  const { activeSheetName } = db
  const finalSheetName = _isEmpty(inputSheet) ? activeSheetName : inputSheet
  const description = _isArray(inputDescription)
    ? inputDescription.join(' ')
    : inputDescription

  if (
    typeof finalSheetName === 'undefined' ||
    finalSheetName === null ||
    _isEmpty(finalSheetName)
  ) {
    throw new Error('No sheet specified and none active')
  }

  const sheet = findSheet(db, finalSheetName)

  if (typeof sheet === 'undefined') {
    throw new Error(`Sheet ${finalSheetName} not found`)
  }

  const { activeEntryID } = sheet
  const finalEntryID =
    inputEntry === null ||
    typeof inputEntry === 'undefined' ||
    !_isFinite(+inputEntry)
      ? activeEntryID
      : +inputEntry

  if (finalEntryID !== null && _isFinite(+finalEntryID)) {
    const entry = findSheetEntry(db, finalSheetName, +finalEntryID)

    if (typeof entry === 'undefined') {
      throw new Error(
        `Entry ${+finalEntryID} not found in sheet ${finalSheetName}`
      )
    }

    if (del) {
      sheet.entries = sheet.entries.filter((e) => e.id !== entry.id)
      log(
        `${C.clText('Deleted entry')} ${C.clHighlight(
          `${finalEntryID}`
        )} ${C.clText('from sheet')} ${C.clSheet(finalSheetName)}`
      )
    } else if (typeof description !== 'undefined' && !_isEmpty(description)) {
      entry.description = description
      log(
        `${C.clText('Updated entry')} ${C.clHighlight(
          `${finalEntryID}`
        )} ${C.clText('in sheet')} ${C.clSheet(finalSheetName)}: ${C.clText(
          description
        )}`
      )
    } else if (!_isEmpty(start)) {
      const startDate = parseDate(start)
      entry.start = startDate
      log(
        `${C.clText('Updated entry')} ${C.clHighlight(
          `${finalEntryID}`
        )} ${C.clText('start date to')} ${C.clDate(startDate.toLocaleString())}`
      )
    } else if (!_isEmpty(end)) {
      const endDate = parseDate(end)

      entry.end = endDate

      log(
        `${C.clText('Updated entry')} ${C.clHighlight(
          `${finalEntryID}`
        )} ${C.clText('end date to')} ${C.clDate(endDate.toLocaleString())}`
      )
    }
  } else {
    if (del) {
      db.sheets = db.sheets.filter((s) => s.name !== finalSheetName)
      log(`${C.clText('Deleted sheet')} ${C.clSheet(finalSheetName)}`)
    } else if (typeof inputName !== 'undefined' && !_isEmpty(inputName)) {
      sheet.name = inputName
      log(
        `${C.clText('Renamed sheet')} ${C.clSheet(finalSheetName)} ${C.clText(
          'to'
        )} ${C.clHighlight(inputName)}`
      )
    } else {
      throw new Error(`No new name specified for sheet ${finalSheetName}`)
    }
  }

  await saveDB(db)
}

export { handler, COMMAND_CONFIG, type EditCommandArguments }
export default {
  ...COMMAND_CONFIG,
  handler
}
