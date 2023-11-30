import formatDuration from 'format-duration'

import log from '../log'
import * as C from '../color'
import { type TimeSheet } from '../types'
import { getTotalSheetDuration } from '../sheets'

const printSheetHeader = (sheet: TimeSheet, isActive?: boolean): void => {
  const { name, entries } = sheet
  const uiPrefix = C.clText('- Sheet')
  const uiName = C.clSheet(name)
  const uiEntryCount = `${C.clText('(')}${C.clHighlight(
    `${entries.length}`
  )} ${C.clText('entries)')}`

  const uiEntries =
    entries.length === 0 ? C.clHighlight('(no entries)') : uiEntryCount
  const totalDuration = formatDuration(getTotalSheetDuration(sheet))
  const uiTotalDuration =
    entries.length === 0 ? '' : C.clDuration(`[${totalDuration}]`)
  const uiActiveStatus = isActive !== true ? '' : C.clHighlight('active')

  log(`${uiPrefix} ${uiName} ${uiEntries} ${uiTotalDuration} ${uiActiveStatus}`)
}

export default printSheetHeader
