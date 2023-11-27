import * as C from '../color'
import * as P from '../print'
import { genSheet } from '../sheets'
import { findSheet, saveDB } from '../db'
import cmdHandler from '../utils/cmd_handler'
import { type TimeTrackerDB } from '../types'

const COMMAND_CONFIG = {
  command: 'sheet [name]',
  describe: 'Switch to a sheet by name, creating it if needed',
  builder: {
    name: {
      describe: 'Sheet name',
      demandOption: true,
      default: null
    }
  }
}

interface SheetCommandArgs {
  db: TimeTrackerDB
  name: string
}

const handler = async (args: SheetCommandArgs) => {
  const { name, db } = args
  const { activeSheetName } = db

  if (name === null) {
    const sheet = findSheet(db, activeSheetName)
    const { entries } = sheet

    if (entries.length > 0) {
      console.log(`${C.clText('- Sheet')} ${C.clSheet(activeSheetName)}`)
      entries.forEach(P.printSheetEntry)
    } else {
      console.log(
        `${C.clText('Currently active sheet:')} ${
          C.clSheet(activeSheetName) ?? C.clError('None')
        }`
      )
    }

    return
  }

  if (activeSheetName === name) {
    console.log(
      `${C.clText('Sheet')} ${C.clSheet(name)} ${C.clText('already active')}`
    )
    return
  }

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

  console.log(`${C.clText('Switched to time sheet:')} ${C.clSheet(name)}`)
}

export default {
  ...COMMAND_CONFIG,
  handler: cmdHandler(handler)
}
