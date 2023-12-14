import _isEmpty from 'lodash/isEmpty'

import log from '../log'
import * as C from '../color'
import * as P from '../print'
import { genSheet } from '../sheets'
import { findSheet, saveDB } from '../db'
import { type TimeTrackerDB } from '../types'

const COMMAND_CONFIG = {
  command: 'sheet [name]',
  describe: 'Switch to a sheet by name, creating it if needed',
  builder: {
    name: {
      describe: 'Sheet name',
      demandOption: true,
      default: ''
    },

    delete: {
      describe: 'Delete sheet by name',
      default: false
    }
  }
}

interface SheetCommandArgs {
  db: TimeTrackerDB
  delete: string
  name: string
}

const handler = async (args: SheetCommandArgs) => {
  const { name, delete: nameOfSheetToDelete, db } = args
  const { activeSheetName } = db

  if (!_isEmpty(nameOfSheetToDelete)) {
    const { sheets } = db
    const existingSheet = findSheet(db, nameOfSheetToDelete)

    if (typeof existingSheet === 'undefined') {
      throw new Error(`Sheet ${nameOfSheetToDelete} does not exist`)
    }

    db.sheets = sheets.filter(
      ({ name: sName }) => sName !== nameOfSheetToDelete
    )

    if (db.activeSheetName === nameOfSheetToDelete) {
      db.activeSheetName = null
    }

    await saveDB(db)

    log(`${C.clText('Deleted sheet')} ${C.clSheet(nameOfSheetToDelete)}`)

    return
  }

  if (_isEmpty(name)) {
    if (activeSheetName === null) {
      throw new Error('No active time sheet')
    }

    const sheet = findSheet(db, activeSheetName)

    if (typeof sheet === 'undefined') {
      throw new Error('No active time sheet')
    }

    const { name, entries } = sheet

    if (entries.length === 0) {
      console.log(
        `${C.clText('Sheet')} ${C.clSheet(name)} ${C.clText('has no entries')}`
      )
      return
    }

    P.printSheet(sheet, name === activeSheetName)
  }

  if (activeSheetName === name) {
    throw new Error(`Sheet ${name} already active`)
  } else if (!_isEmpty(name)) {
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

    log(`${C.clText('Switched to time sheet:')} ${C.clSheet(name)}`)
  }
}

export { handler }
export default {
  ...COMMAND_CONFIG,
  handler
}
