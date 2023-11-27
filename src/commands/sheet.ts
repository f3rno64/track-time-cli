import _sum from 'lodash/sum'
import _isEmpty from 'lodash/isEmpty'
import formatDuration from 'format-duration'
import _isUndefined from 'lodash/isUndefined'

import * as C from '../color'
import * as P from '../print'
import { genSheet } from '../sheets'
import { findSheet, saveDB } from '../db'
import cmdHandler from '../utils/cmd_handler'
import { TimeSheetEntry, type TimeTrackerDB } from '../types'

const COMMAND_CONFIG = {
  command: ['sheet [name]', '$0 [options] [name]'],
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

    if (_isUndefined(existingSheet)) {
      console.log(
        `${C.clError('Sheet')} ${C.clSheet(nameOfSheetToDelete)} ${C.clError(
          'does not exist'
        )}`
      )
      return
    }

    db.sheets = sheets.filter(
      ({ name: sName }) => sName !== nameOfSheetToDelete
    )

    if (db.activeSheetName === nameOfSheetToDelete) {
      db.activeSheetName = null
    }

    await saveDB(db)

    console.log(
      `${C.clText('Deleted sheet')} ${C.clSheet(nameOfSheetToDelete)}`
    )

    return
  }

  if (_isEmpty(name)) {
    const sheet = findSheet(db, activeSheetName)

    if (_isUndefined(sheet)) {
      console.log(C.clError('No active time sheet'))
      return
    }

    const { activeEntryID, name, entries } = sheet

    if (entries.length > 0) {
      const totalSheetDuration = _sum(
        entries.map(
          ({ start, end }) => (end === null ? Date.now() : +end) - +start
        )
      )

      console.log(
        `${C.clText('- Sheet')} ${C.clSheet(activeSheetName)} [${C.clDuration(
          `${formatDuration(totalSheetDuration)}`
        )}]`
      )

      entries.forEach((entry: TimeSheetEntry): void => {
        const { id } = entry

        P.printSheetEntry(entry, id === activeEntryID)
      })
    } else {
      console.log(
        `${C.clHighlight('Sheet')} ${C.clSheet(name)} ${C.clHighlight(
          'has no entries'
        )}`
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
