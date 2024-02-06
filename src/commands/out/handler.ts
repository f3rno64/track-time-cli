import parseDate from 'time-speak'
import _isEmpty from 'lodash/isEmpty'
import _isFinite from 'lodash/isFinite'
import formatDuration from 'format-duration'
import _isUndefined from 'lodash/isUndefined'

import log from '../../log'
import { type OutCommandArgs } from './types'
import { clDuration, clHighlight, clSheet, clText } from '../../color'

const handler = async (args: OutCommandArgs): Promise<void> => {
  const { at, db, help, yargs } = args

  if (help) {
    yargs.showHelp()
    process.exit(0)
  }

  const endDate =
    _isUndefined(at) || _isEmpty(at)
      ? new Date()
      : new Date(+parseDate(at.join(' ')))

  const sheet = db.getActiveSheet()
  const { activeEntryID, name: sheetName } = sheet

  if (activeEntryID === null || !_isFinite(activeEntryID)) {
    throw new Error(`No active entry for sheet ${sheetName}`)
  }

  const entry = db.getSheetEntry(sheet, activeEntryID)

  if (_isUndefined(entry)) {
    throw new Error(`No entry found with ID ${activeEntryID}`)
  } else {
    await db.checkOutOfSheetEntry(sheet, entry, endDate)

    const { description, end, start } = entry
    const descriptionUI = clText(description)
    const durationUI = clDuration(
      formatDuration(end === null ? Date.now() - +start : +end - +start)
    )

    log(
      `${clHighlight('Checked out of sheet')} ${clSheet(
        sheetName
      )}: ${descriptionUI} [${durationUI}]`
    )
  }
}

export default handler
