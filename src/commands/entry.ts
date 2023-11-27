import _isEmpty from 'lodash/isEmpty'
import _isUndefined from 'lodash/isUndefined'

import * as U from '../utils'
import * as C from '../color'
import { type TimeTrackerDB } from '../types'
import { findSheet, findSheetEntry, saveDB } from '../db'

const COMMAND_CONFIG = {
  command: 'entry [id] [edit..]',
  describe: 'View, modify, or delete a time sheet entry',
  builder: {
    id: {
      describe: 'ID of time sheet entry to edit'
    },

    sheet: {
      describe: 'Name of the sheet that owns the entry'
    },

    edit: {
      describe:
        'If provided, the rest of the input is set as the entry description'
    },

    delete: {
      describe: 'If present, delete the entry',
      type: 'boolean',
      default: false
    }
  }
}

interface EntryCommandArguments {
  db: TimeTrackerDB
  sheet: string
  id: string
  edit: string[]
  delete: boolean
}

const handler = async (args: EntryCommandArguments): Promise<void> => {
  const { db, sheet: sheetName, id, edit, delete: del } = args
  const editedDescription = edit.join(' ')
  const { activeSheetName } = db
  const finalSheetName = _isEmpty(sheetName) ? activeSheetName : sheetName

  const sheet = findSheet(db, finalSheetName)

  if (_isUndefined(sheet)) {
    console.log(C.clError('Sheet does not exist'))
    return
  }

  const entry = findSheetEntry(db, finalSheetName, +id)

  if (_isUndefined(entry)) {
    console.log(
      `${C.clError('No entry with ID')} ${C.clID(`${id}`)} ${C.clError(
        'exists'
      )}`
    )
    return
  }

  if (editedDescription.length > 0) {
    entry.description = editedDescription

    console.log(
      `${C.clText('Set entry')} ${C.clID(
        `${id}`
      )} description to: ${editedDescription}`
    )
  } else if (del === true) {
    sheet.entries = sheet.entries.filter(({ id }) => id != entry.id)

    if (sheet.activeEntryID === entry.id) {
      sheet.activeEntryID = null
    }

    console.log(`${C.clText('Deleted entry with ID')} ${C.clID(`${id}`)}`)
  }

  await saveDB(db)
}

export default {
  ...COMMAND_CONFIG,
  handler: U.cmdHandler(handler)
}
