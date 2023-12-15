import _isEmpty from 'lodash/isEmpty'

import log from '../log'
import * as C from '../color'
import { genSheet } from '../sheets'
import { findSheet, saveDB } from '../db'
import { type TimeTrackerDB } from '../types'

const COMMAND_CONFIG = {
  command: 'sheet [name]',
  describe: 'Switch to or delete a sheet by name',
  aliases: ['s'],
  builder: {
    name: {
      describe: 'Sheet name',
      type: 'string'
    },

    delete: {
      describe: 'Delete the specified sheet',
      type: 'boolean'
    }
  }
}

interface SheetCommandArgs {
  db: TimeTrackerDB
  delete: boolean
  name: string
}

const handler = async (args: SheetCommandArgs) => {
  const { name, delete: del, db } = args
  const { activeSheetName } = db
  const sheetName = _isEmpty(name) ? activeSheetName : name

  if (sheetName === null) {
    throw new Error('No active sheet')
  } else if (activeSheetName === name) {
    throw new Error(`Sheet ${name} already active`)
  }

  if (del) {
    const sheetToDelete = findSheet(db, sheetName)

    if (typeof sheetToDelete === 'undefined') {
      throw new Error(`Sheet ${sheetName} does not exist`)
    }

    db.sheets = db.sheets.filter(({ name: sName }) => sName !== sheetName)

    if (db.activeSheetName === sheetName) {
      db.activeSheetName = null
    }

    await saveDB(db)

    log(`${C.clText('Deleted sheet')} ${C.clSheet(sheetName)}`)
  } else if (_isEmpty(name)) {
    log(
      `${C.clText('Sheet')} ${C.clHighlightRed(sheetName)} ${C.clText(
        'is active'
      )}`
    )
  } else {
    const existingSheet = findSheet(db, name)
    let sheet = null

    if (typeof existingSheet === 'undefined') {
      sheet = genSheet(name)
      db.sheets.push(sheet)
      await saveDB(db)
    } else {
      sheet = existingSheet
    }

    db.activeSheetName = sheet.name

    await saveDB(db)

    log(`${C.clText('Switched to sheet:')} ${C.clSheet(name)}`)
  }
}

export { handler }
export default {
  ...COMMAND_CONFIG,
  handler
}
