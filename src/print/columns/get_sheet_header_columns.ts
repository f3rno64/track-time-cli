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

  const totalDuration = U.getTotalSheetDuration(sheet)
  const totalDurationString = U.getDurationLangString(totalDuration, humanize)
  const uiTotalDuration =
    entries.length === 0 ? '' : C.clDuration(`[${totalDurationString}]`)

  const uiActiveStatus = isActive !== true ? '' : C.clHighlightRed('* Active *')

  return [uiPrefix, uiName, uiEntries, uiTotalDuration, uiActiveStatus]
}

export default getSheetHeaderColumns
