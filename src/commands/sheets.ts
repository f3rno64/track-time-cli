import * as P from '../print'
import { TimeSheet, type TimeTrackerDB } from '../types'

const COMMAND_CONFIG = {
  command: 'sheets',
  describe: 'List all sheets',
  aliases: ['ss'],
  builder: {
    humanize: {
      describe: 'Humanize the total duration',
      type: 'boolean'
    }
  }
}

interface SheetsCommandArgs {
  db: TimeTrackerDB
  humanize?: boolean
}

const handler = async (args: SheetsCommandArgs) => {
  const { humanize, db } = args
  const { activeSheetName, sheets } = db

  if (sheets.length === 0) {
    throw new Error('No time sheets exist')
  }

  const sheetHeaderRows = sheets.map((sheet: TimeSheet): string[] =>
    P.getSheetHeaderColumns(sheet, sheet.name === activeSheetName, humanize)
  )

  P.printJustifiedContent(sheetHeaderRows)
}

export { handler }
export default {
  ...COMMAND_CONFIG,
  handler
}
