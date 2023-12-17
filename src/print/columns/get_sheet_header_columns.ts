import formatDuration from 'format-duration'

import * as C from '../../color'
import * as U from '../../utils'
import { type TimeSheet } from '../../types'

const getSheetHeaderColumns = (
  sheet: TimeSheet,
  isActive?: boolean,
  humanize?: boolean
): string[] => {
  const { name, entries } = sheet
  const uiPrefix = C.clText('- Sheet')
  const uiName = C.clSheet(name)
  const uiEntryCount = `${C.clText('(')}${C.clHighlight(
    `${entries.length}`
  )} ${C.clText('entries)')}`

  const uiEntries =
    entries.length === 0 ? C.clHighlight('(no entries)') : uiEntryCount

  const totalDuration =
    humanize === true
      ? U.getDurationLangString(U.getTotalSheetDuration(sheet))
      : formatDuration(U.getTotalSheetDuration(sheet))

  const uiTotalDuration =
    entries.length === 0 ? '' : C.clDuration(`[${totalDuration}]`)

  const uiActiveStatus = isActive !== true ? '' : C.clHighlightRed('* Active *')

  return [uiPrefix, uiName, uiEntries, uiTotalDuration, uiActiveStatus]
}

export default getSheetHeaderColumns
