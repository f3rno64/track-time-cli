import DB from '../db'
import log from '../log'
import * as C from '../color'
import * as O from '../options'

const COMMAND_CONFIG = {
  command: 'sheet [name]',
  describe: 'Switch to or delete a sheet by name',
  aliases: ['s'],
  builder: O.setup.bind(null, [O.DeleteOption, O.NameOption])
}

interface SheetCommandArgs {
  db: DB
  delete?: boolean
  name?: string
}

const handler = async (args: SheetCommandArgs) => {
  const { name, delete: del, db } = args
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

export { handler }
export default {
  ...COMMAND_CONFIG,
  handler
}
