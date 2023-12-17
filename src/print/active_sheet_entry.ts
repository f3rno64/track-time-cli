import log from '../log'
import * as C from '../color'
import * as U from '../utils'
import { type TimeSheetEntry } from '../types'

const printActiveSheetEntry = (
  entry: TimeSheetEntry,
  sheetName: string,
  humanize?: boolean
): void => {
  const { start, end, description } = entry
  const finalEnd = end === null ? new Date() : end
  const duration = +finalEnd - +start
  const descriptionUI = C.clText(description)
  const sheetNameUI = C.clSheet(`${sheetName}:`)
  const durationUI = C.clDuration(
    `[running for ${U.getDurationLangString(duration, humanize)}]`
  )

  log(`${sheetNameUI} ${durationUI} ${descriptionUI}`.trim())
}

export default printActiveSheetEntry
