import _max from 'lodash/max'

import * as P from '../print'
import * as U from '../utils'
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
  const { sheets } = db
  const sheetsWithActiveEntries = sheets.filter(
    ({ entries }) => entries.filter(({ end }) => end === null).length > 0
  )

  if (sheetsWithActiveEntries.length === 0) {
    throw new Error('No sheets with active entries')
  }

  sheetsWithActiveEntries.sort(
    ({ entries: a }, { entries: b }) =>
      +_max(a.map(({ start }) => start)) - +_max(b.map(({ start }) => start))
  )

  const [sheet] = sheetsWithActiveEntries
  const { name, activeEntryID, entries } = sheet
  const entry = entries.find(({ id }) => id === activeEntryID)

  P.printSheetEntry(entry, true, name)
}

export { handler }
export default {
  ...COMMAND_CONFIG,
  handler: U.cmdHandler(handler)
}
