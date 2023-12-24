import log from '../../log'
import * as C from '../../color'
import { type SheetCommandArgs } from './types'

const handler = async (args: SheetCommandArgs) => {
  const { yargs, help, name, delete: del, db } = args

  if (help) {
    yargs.showHelp()
    process.exit(0)
  }

  const activeSheetName = db.getActiveSheetName()
  const sheetName = typeof name === 'undefined' ? activeSheetName : name

  if (sheetName === null) {
    throw new Error('No active sheet')
  } else if (activeSheetName === name) {
    throw new Error(`Sheet ${name} already active`)
  }

  if (del) {
    await db.removeSheet(sheetName)

    log(`${C.clText('Deleted sheet')} ${C.clSheet(sheetName)}`)
  } else if (typeof name === 'undefined') {
    log(
      `${C.clText('Sheet')} ${C.clHighlightRed(sheetName)} ${C.clText(
        'is active'
      )}`
    )
  } else {
    const sheet = db.doesSheetExist(name)
      ? db.getSheet(name)
      : await db.addSheet(name)

    await db.setActiveSheet(sheet)

    log(`${C.clText('Switched to sheet:')} ${C.clSheet(name)}`)
  }
}

export default handler
