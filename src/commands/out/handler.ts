import parseDate from 'time-speak'
import _isEmpty from 'lodash/isEmpty'
import _isFinite from 'lodash/isFinite'
import formatDuration from 'format-duration'

import log from '../../log'
import * as C from '../../color'
import { type OutCommandArgs } from './types'

const handler = async (args: OutCommandArgs) => {
  const { yargs, help, at, db } = args

  if (help) {
    yargs.showHelp()
    process.exit(0)
  }

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

export default handler
