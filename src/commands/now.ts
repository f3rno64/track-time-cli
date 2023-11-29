import * as C from '../color'
import * as P from '../print'
import * as U from '../utils'
import { type TimeSheetEntry, type TimeTrackerDB } from '../types'

const COMMAND_CONFIG = {
  command: ['now', '$0'],
  describe: 'Display all active time sheet entries',
  alias: 'n'
}

interface NowCommandArguments {
  db: TimeTrackerDB
}

const handler = (args: NowCommandArguments) => {
  const { db } = args
  const { activeSheetName, sheets } = db
  const sheetsWithActiveEntries = sheets
    .map(({ name, entries }) => ({
      sheetName: name,
      entries: entries.filter(({ end }) => end === null)
    }))
    .filter(({ entries }) => entries.length > 0)

  if (sheetsWithActiveEntries.length === 0) {
    console.log(
      `[${C.clText('Active sheet')} ${C.clSheet(
        activeSheetName ?? 'No active sheet'
      )}] ${C.clText('No active entries')}`
    )
    return
  }

  sheetsWithActiveEntries.forEach(({ sheetName, entries }, i: number) => {
    console.log(`${C.clText('- Sheet')} ${C.clSheet(sheetName)}`)

    entries.map((entry: TimeSheetEntry): void => {
      P.printSheetEntry(entry, true)
    })

    if (i < sheetsWithActiveEntries.length - 1) {
      console.log('')
    }
  })
}

export default {
  ...COMMAND_CONFIG,
  handler: U.cmdHandler(handler)
}
