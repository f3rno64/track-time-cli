import { clDuration, clSheet, clText } from '../color'
import log from '../log'
import { type TimeSheetEntry } from '../types'
import { getDurationLangString } from '../utils'

const printActiveSheetEntry = (
  entry: TimeSheetEntry,
  sheetName: string,
  humanize?: boolean
): void => {
  const { description, end, start } = entry
  const finalEnd = end === null ? new Date() : end
  const duration = +finalEnd - +start
  const descriptionUI = clText(description)
  const sheetNameUI = clSheet(`${sheetName}:`)
  const durationUI = clDuration(
    `[running for ${getDurationLangString(duration, humanize)}]`
  )

  log(`${sheetNameUI} ${durationUI} ${descriptionUI}`.trim())
}

export default printActiveSheetEntry
