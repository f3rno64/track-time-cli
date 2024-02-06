import formatDuration from 'format-duration'

import {
  clDuration,
  clHighlight,
  clHighlightRed,
  clSheet,
  clText
} from '../color'
import log from '../log'
import { type TimeSheet } from '../types'
import { getDurationLangString, getTotalSheetDuration } from '../utils'

const printSheetHeader = (
  sheet: TimeSheet,
  isActive?: boolean,
  humanize?: boolean
): void => {
  const { entries, name } = sheet
  const uiPrefix = clText('- Sheet')
  const uiName = clSheet(name)
  const uiEntryCount = `${clText('(')}${clHighlight(
    `${entries.length}`
  )} ${clText('entries)')}`

  const uiEntries =
    entries.length === 0 ? clHighlight('(no entries)') : uiEntryCount

  const totalDuration =
    humanize === true
      ? getDurationLangString(getTotalSheetDuration(sheet))
      : formatDuration(getTotalSheetDuration(sheet))

  const uiTotalDuration =
    entries.length === 0 ? '' : clDuration(`[${totalDuration}]`)

  const uiActiveStatus = isActive !== true ? '' : clHighlightRed('* Active *')

  log(`${uiPrefix} ${uiName} ${uiEntries} ${uiTotalDuration} ${uiActiveStatus}`)
}

export default printSheetHeader
