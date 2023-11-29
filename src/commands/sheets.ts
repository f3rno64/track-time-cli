import formatDuration from 'format-duration'

import * as C from '../color'
import * as U from '../utils'
import { getTotalSheetDuration } from '../sheets'
import { TimeSheet, type TimeTrackerDB } from '../types'

const COMMAND_CONFIG = {
  command: 'sheets',
  describe: 'List all sheets'
}

interface SheetsCommandArgs {
  db: TimeTrackerDB
}

const printSheet = (sheet: TimeSheet, activeSheetName?: string): void => {
  const { name, entries } = sheet
  const uiName = C.clSheet(name)
  const uiEntryCount = C.clText(`${entries.length} entries`)
  const uiActive = name === activeSheetName ? C.clHighlight('(active)') : ''
  const totalDuration = getTotalSheetDuration(sheet)
  const uiTotalDuration = `${C.clDuration(
    `[${formatDuration(totalDuration)}]`
  )}`

  console.log(
    `${C.clText(
      'Sheet'
    )} ${uiName}: ${uiEntryCount} ${uiActive} ${uiTotalDuration}`.trim()
  )
}

const handler = async (args: SheetsCommandArgs) => {
  const { db } = args
  const { activeSheetName, sheets } = db

  if (sheets.length === 0) {
    console.log(C.clText('No time sheets exist'))
    return
  }

  sheets.forEach((sheet: TimeSheet): void => {
    printSheet(sheet, activeSheetName)
  })
}

export default {
  ...COMMAND_CONFIG,
  handler: U.cmdHandler(handler)
}
