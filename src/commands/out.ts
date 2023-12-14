import parseDate from 'time-speak'
import _isEmpty from 'lodash/isEmpty'
import _isFinite from 'lodash/isFinite'
import formatDuration from 'format-duration'

import log from '../log'
import * as C from '../color'
import { findSheet, saveDB } from '../db'
import { type TimeTrackerDB } from '../types'

interface OutCommandArgs {
  at: string[]
  sheet: string
  entry: string
  db: TimeTrackerDB
}

const COMMAND_CONFIG = {
  command: 'out',
  describe: 'Check out of the currently active time sheet entry',
  aliases: ['o'],
  builder: {
    at: {
      describe: 'Check out at a specific time'
    }
  }
}

const handler = async (args: OutCommandArgs) => {
  const { at, db } = args
  const endDate = _isEmpty(at) ? new Date() : parseDate(at)
  const { activeSheetName } = db

  if (activeSheetName === null) {
    throw new Error('No active sheet')
  }

  const sheet = findSheet(db, activeSheetName)

  if (typeof sheet === 'undefined') {
    throw new Error(`Sheet ${activeSheetName} does not exist`)
  }

  const { name: sheetName, activeEntryID } = sheet

  if (!_isFinite(activeEntryID)) {
    throw new Error(`No active entry for sheet ${sheetName}`)
  }

  const entry = sheet.entries.find(({ id }) => id === activeEntryID)

  if (typeof entry === 'undefined') {
    throw new Error(`No entry found with ID ${activeEntryID}`)
  } else {
    entry.end = endDate
    sheet.activeEntryID = null

    await saveDB(db)

    const { start, end, description } = entry
    const descriptionUI = C.clText(description)
    const durationUI = C.clDuration(
      formatDuration(end === null ? Date.now() - +start : +end - +start)
    )

    log(
      `${C.clHighlight('Checked out of sheet')} ${C.clSheet(
        sheetName
      )}: ${descriptionUI} [${durationUI}]`
    )
  }
}

export default {
  ...COMMAND_CONFIG,
  handler
}
