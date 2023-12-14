import _max from 'lodash/max'

import log from '../log'
import * as C from '../color'
import * as P from '../print'
import { type TimeTrackerDB } from '../types'

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
  const sheetsWithActiveEntries = sheets.filter(
    ({ entries }) => entries.filter(({ end }) => end === null).length > 0
  )

  if (sheetsWithActiveEntries.length === 0) {
    log(
      `${C.clSheet(`[${activeSheetName}]`)} ${C.clHighlight('No active entry')}`
    )
    return
  }

  log(C.clText('Sheets with active entries'))
  log('')

  sheetsWithActiveEntries.sort(
    ({ entries: a }, { entries: b }) =>
      +(_max(a.map(({ start }) => start)) ?? Date.now()) -
      +(_max(b.map(({ start }) => start)) ?? Date.now())
  )

  sheetsWithActiveEntries.forEach(({ name, activeEntryID, entries }) => {
    const entry = entries.find(({ id }) => id === activeEntryID)

    if (typeof entry === 'undefined') {
      throw new Error(
        `Active entry with ID ${activeEntryID} for sheet ${name} not found`
      )
    }

    P.printActiveSheetEntry(entry, name)
  })
}

export { handler }
export default {
  ...COMMAND_CONFIG,
  handler
}
