import formatDuration from 'format-duration'

import log from '../log'
import * as C from '../color'
import { type TimeSheetEntry } from '../types'

const printActiveSheetEntry = (
  entry: TimeSheetEntry,
  sheetName: string
): void => {
  const { start, end, description } = entry
  const finalEnd = end === null ? new Date() : end
  const descriptionUI = C.clText(description)
  const durationUI = C.clDuration(`[${formatDuration(+finalEnd - +start)}]`)
  const sheetNameUI = C.clSheet(`${sheetName}:`)

  log(`${sheetNameUI} ${durationUI} ${descriptionUI}`.trim())
}

export default printActiveSheetEntry
