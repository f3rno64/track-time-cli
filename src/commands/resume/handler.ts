import _isFinite from 'lodash/isFinite'

import log from '../../log'
import * as C from '../../color'
import { type ResumeCommandArgs } from './types'

const handler = async (args: ResumeCommandArgs) => {
  const { help, yargs, db } = args

  if (help) {
    yargs.showHelp()
    process.exit(0)
  }

  const sheet = db.getActiveSheet()
  const entry = db.getMostRecentlyActiveSheetEntry(sheet)
  const { id, description, end } = entry
  const { name } = sheet

  if (_isFinite(end)) {
    throw new Error(
      `Sheet ${name} already has an active entry (${id}: ${description})`
    )
  }

  await db.addActiveSheetEntry(sheet, description)

  log(
    `${C.clSheet(`${name}:`)} ${C.clText('resumed')} ${C.clHighlight(
      description
    )}`
  )
}

export default handler
