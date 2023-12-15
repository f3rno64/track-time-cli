import sAgo from 's-ago'
import parseDate from 'time-speak'
import _isEmpty from 'lodash/isEmpty'
import _compact from 'lodash/compact'

import log from '../log'
import * as C from '../color'
import * as P from '../print'
import * as U from '../utils'
import * as S from '../sheets'
import { findSheet } from '../db'
import { type TimeSheet, type TimeTrackerDB } from '../types'

const COMMAND_CONFIG = {
  command: 'list [sheets..]',
  describe: 'List all time sheet entries',
  aliases: ['l'],
  builder: {
    ago: {
      description: 'Print dates as relative time (e.g. 5 minutes ago)',
      type: 'boolean'
    },

    since: {
      description: 'Only list entries since the specified date',
      type: 'string'
    },

    today: {
      describe: 'Show results for today',
      type: 'boolean'
    },

    all: {
      description: 'List all sheets, including inactive ones',
      type: 'boolean'
    }
  }
}

interface ListCommandArgs {
  sheets: string[]
  db: TimeTrackerDB
  ago: boolean
  all: boolean
  since: string
  today: boolean
}

const handler = (args: ListCommandArgs) => {
  const { today, since, all, ago, sheets, db } = args
  const { activeSheetName, sheets: dbSheets } = db

  if (!_isEmpty(since) && today) {
    throw new Error('Cannot use both --since and --today')
  }

  // prettier-ignore
  const sheetsToList: TimeSheet[] = _isEmpty(sheets)
    ? all
      ? dbSheets
      : activeSheetName === null
        ? []
        : _compact([findSheet(db, activeSheetName)])
    : _compact(
      sheets.map((name: string): TimeSheet => {
        const sheet = findSheet(db, name)

        if (typeof sheet === 'undefined') {
          throw new Error(`No sheet found with name ${name}`)
        }

        return sheet
      })
    )

  if (_isEmpty(sheetsToList)) {
    throw new Error('No relevant sheets found')
  }

  // prettier-ignore
  const sinceDate = !_isEmpty(since)
    ? parseDate(since)
    : today
      ? U.getStartDate()
      : null

  // prettier-ignore
  const filteredSheets =
    sinceDate === null
      ? sheetsToList
      : S.filterWithEntriesSinceDate(sheetsToList, sinceDate)

  if (today) {
    log(
      `${C.clText('* Showing')} ${C.clHighlight(
        `${filteredSheets.length}`
      )} ${C.clText('sheets for today')}`
    )
  } else if (sinceDate !== null) {
    log(
      `${C.clText('* Showing sheets since')} ${C.clHighlight(
        sinceDate.toLocaleString()
      )} ${C.clDate(`[${sAgo(sinceDate)}]`)}`
    )
  } else {
    log(
      `${C.clText('* Showing')} ${C.clHighlight(
        `${filteredSheets.length}`
      )} ${C.clText('sheets')}`
    )
  }

  log('')

  P.printSheets(filteredSheets, ago === true)

  if (!all) {
    const sheetsNotShownCount = dbSheets.length - filteredSheets.length

    log('')
    log(
      `${C.clText('*')} ${C.clHighlightRed(
        `${sheetsNotShownCount}`
      )} ${C.clText('Sheets not shown')}. ${C.clText('use')} ${C.clHighlightRed(
        '--all'
      )} ${C.clText('to show')}`
    )
  }
}

export default {
  ...COMMAND_CONFIG,
  handler
}
