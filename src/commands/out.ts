import parseDate from 'time-speak'
import _isEmpty from 'lodash/isEmpty'
import _isFinite from 'lodash/isFinite'
import formatDuration from 'format-duration'

import DB from '../db'
import log from '../log'
import * as C from '../color'
import * as O from '../options'

interface OutCommandArgs {
  db: DB
  at?: string[]
}

const COMMAND_CONFIG = {
  command: 'out',
  describe: 'Check out of the currently active time sheet entry',
  aliases: ['o'],
  builder: O.setup.bind(null, [O.AtOption])
}

const handler = async (args: OutCommandArgs) => {
  const { at, db } = args
  const endDate = _isEmpty(at) ? new Date() : parseDate(at)
  const sheet = db.getActiveSheet()
  const { name: sheetName, activeEntryID } = sheet

  if (activeEntryID === null || !_isFinite(activeEntryID)) {
    throw new Error(`No active entry for sheet ${sheetName}`)
  }

  const entry = db.getSheetEntry(sheet, activeEntryID)

  if (typeof entry === 'undefined') {
    throw new Error(`No entry found with ID ${activeEntryID}`)
  } else {
    await db.checkOutOfSheetEntry(sheet, entry, endDate)

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
