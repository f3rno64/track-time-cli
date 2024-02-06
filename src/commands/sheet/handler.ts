import _isUndefined from 'lodash/isUndefined'

import log from '../../log'
import { type SheetCommandArgs } from './types'
import { clHighlightRed, clSheet, clText } from '../../color'

const handler = async (args: SheetCommandArgs): Promise<void> => {
  const { db, delete: del, help, name, yargs } = args

  if (help) {
    yargs.showHelp()
    process.exit(0)
  }

  const activeSheetName = db.getActiveSheetName()
  const sheetName = _isUndefined(name) ? activeSheetName : name

  if (sheetName === null) {
    throw new Error('No active sheet')
  } else if (activeSheetName === name) {
    throw new Error(`Sheet ${name} already active`)
  }

  if (del) {
    await db.removeSheet(sheetName)

    log(`${clText('Deleted sheet')} ${clSheet(sheetName)}`)
  } else if (_isUndefined(name)) {
    log(
      `${clText('Sheet')} ${clHighlightRed(sheetName)} ${clText('is active')}`
    )
  } else {
    const sheet = db.doesSheetExist(name)
      ? db.getSheet(name)
      : await db.addSheet(name)

    await db.setActiveSheet(sheet)

    log(`${clText('Switched to sheet:')} ${clSheet(name)}`)
  }
}

export default handler
