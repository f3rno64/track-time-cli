import { clDuration, clSheet, clText, clTag } from '../color'
import log from '../log'
import { type TimeSheetEntry } from '../types'
import { getDurationLangString } from '../utils'

const printActiveSheetEntry = (
  entry: TimeSheetEntry,
  sheetName: string,
  humanize?: boolean
): void => {
  const { description, end, start, tags } = entry
  const finalEnd = end === null ? new Date() : end
  const duration = +finalEnd - +start
  const descriptionUI = clText(description)
  const sheetNameUI = clSheet(`${sheetName}:`)
  const durationUI = clDuration(
    `[running for ${getDurationLangString(duration, humanize)}]`
  )

  const tagsUI = tags.map(clTag).join(' ')

  log(`${sheetNameUI} ${durationUI} ${descriptionUI} ${tagsUI}`.trim())
}

export default printActiveSheetEntry
