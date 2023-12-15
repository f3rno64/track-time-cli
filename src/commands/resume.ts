import _isFinite from 'lodash/isFinite'

import DB from '../db'
import log from '../log'
import * as C from '../color'

const COMMAND_CONFIG = {
  command: 'resume',
  describe: 'Resume the last active entry',
  aliases: ['r']
}

interface ResumeCommandArgs {
  db: DB
}

const handler = async (args: ResumeCommandArgs) => {
  const { db } = args
  const sheet = db.getMostRecentlyActiveSheet()
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

export { handler }
export default {
  ...COMMAND_CONFIG,
  handler
}
