import {
  clDuration,
  clHighlight,
  clHighlightRed,
  clSheet,
  clText
} from '../../color'
import { type TimeSheet } from '../../types'
import { getDurationLangString, getTotalSheetDuration } from '../../utils'

const getSheetHeaderColumns = (
  sheet: TimeSheet,
  isActive?: boolean,
  humanize?: boolean
): string[] => {
  const { entries, name } = sheet
  const uiPrefix = clText('- Sheet')
  const uiName = clSheet(name)
  const uiEntryCount = `${clText('(')}${clHighlight(
    `${entries.length}`
  )} ${clText('entries)')}`

  const uiEntries =
    entries.length === 0 ? clHighlight('(no entries)') : uiEntryCount

  const totalDuration = getTotalSheetDuration(sheet)
  const totalDurationString = getDurationLangString(totalDuration, humanize)
  const uiTotalDuration =
    entries.length === 0 ? '' : clDuration(`[${totalDurationString}]`)

  const uiActiveStatus = isActive !== true ? '' : clHighlightRed('* Active *')

  return [uiPrefix, uiName, uiEntries, uiTotalDuration, uiActiveStatus]
}

export default getSheetHeaderColumns
