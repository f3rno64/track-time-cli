import parseDate from 'time-speak'
import _isEmpty from 'lodash/isEmpty'
import _isFinite from 'lodash/isFinite'
import formatDuration from 'format-duration'

import * as C from '../color'
import { findSheet, saveDB } from '../db'
import cmdHandler from '../utils/cmd_handler'
import { type TimeTrackerDB } from '../types'

interface OutCommandArgs {
  at: string[]
  sheet: string
  entry: string
  db: TimeTrackerDB
}

const COMMAND_CONFIG = {
  command: 'out [options]',
  describe: 'Check out of the currently active time sheet entry',
  builder: {
    at: {
      describe: 'Check out at a specific time'
    },

    sheet: {
      describe: 'Name of sheet to check in to',
      default: ''
    },

    entry: {
      describe: 'ID of entry to check out from',
      default: ''
    }
  }
}

const handler = async (args: OutCommandArgs) => {
  const { at, sheet: inputSheetName, entry: inputEntry, db } = args
  const endDate = _isEmpty(at) ? new Date() : parseDate(at)

  const { activeSheetName } = db
  const finalSheetName = _isEmpty(inputSheetName)
    ? activeSheetName
    : inputSheetName

  if (_isEmpty(finalSheetName)) {
    console.log(C.clError('No active sheet'))
    return
  }

  const sheet = findSheet(db, finalSheetName)

  if (typeof sheet === 'undefined') {
    console.log(
      `${C.clText('Sheet')} ${C.clSheet(inputSheetName)} ${C.clError(
        'not found'
      )}`
    )
    return
  }

  const { name: sheetName, activeEntryID } = sheet
  const finalActiveEntryID = _isEmpty(inputEntry) ? activeEntryID : inputEntry

  if (!_isFinite(finalActiveEntryID)) {
    console.log(
      `${C.clError('No active entry for sheet')} ${C.clSheet(sheetName)}`
    )
    return
  }

  const entry = sheet.entries.find(({ id }) => id === finalActiveEntryID)

  if (typeof entry === 'undefined') {
    console.log(
      `${C.clText('Sheet entry')} ${C.clID(
        `${finalActiveEntryID}`
      )} ${C.clError('not found')}`
    )
  } else {
    entry.end = endDate
    sheet.activeEntryID = null

    await saveDB(db)

    const { start, end, description } = entry
    const descriptionUI = C.clText(description)
    const durationUI = C.clDuration(formatDuration(+end - +start))

    console.log(
      `${C.clHighlight('Checked out of')} ${C.clSheet(
        sheetName
      )}: ${descriptionUI} [${durationUI}]`
    )
  }
}

export default {
  ...COMMAND_CONFIG,
  handler: cmdHandler(handler)
}
