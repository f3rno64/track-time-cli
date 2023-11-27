import ago from 's-ago'
import parseDate from 'time-speak'
import _isEmpty from 'lodash/isEmpty'
import humanizeDuration from 'humanize-duration'

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
  command: 'out [at..]',
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
  const finalAt = _isEmpty(at) ? new Date() : parseDate(at.join(' '))

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

  if (_isEmpty(finalActiveEntryID)) {
    console.log(C.clError('No active entry'))
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
    entry.end = finalAt

    await saveDB(db)

    const { start, end, description } = entry
    const startUI = C.clDateAgo(ago(start))
    const endUI = C.clDateAgo(ago(end))
    const descriptionUI = C.clText(description)
    const durationUI = C.clDuration(humanizeDuration(+end - +start))

    console.log(
      `${C.clText('Checked out of sheet')} ${C.clSheet(
        sheetName
      )}: ${descriptionUI} (${startUI} -> ${endUI}) [${durationUI}]`
    )
  }
}

export default {
  ...COMMAND_CONFIG,
  handler: cmdHandler(handler)
}
