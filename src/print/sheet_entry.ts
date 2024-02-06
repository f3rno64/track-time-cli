import ago from 's-ago'
import colors from 'colors'
import _isEmpty from 'lodash/isEmpty'
import formatDuration from 'format-duration'
import _isUndefined from 'lodash/isUndefined'

import log from '../log'
import { type TimeSheetEntry } from '../types'
import {
  clID,
  clText,
  clDate,
  clSheet,
  clDuration,
  clHighlight
} from '../color'

const printSheetEntry = (
  entry: TimeSheetEntry,
  isActive?: boolean,
  sheetName?: string,
  printDateAgo?: boolean
): void => {
  const { description, end, id, start } = entry
  const idUI = clID(`(${id})`)
  const startUI = clDate(
    printDateAgo ? (ago(start) as string) : new Date(start).toLocaleDateString()
  )
  const finalEnd = end === null ? new Date() : end
  const descriptionUI = clText(`[${description}]`)
  const durationUI = clDuration(formatDuration(+finalEnd - +start))

  // prettier-ignore
  const endUI =
    end === null
      ? ''
      : clDate(
        printDateAgo ? (ago(start) as string) : new Date(end).toLocaleDateString()
      )

  const dateUI = end === null ? startUI : endUI
  const sheetNamePrefix =
    _isUndefined(sheetName) || _isEmpty(sheetName)
      ? ''
      : `${clText('sheet')} ${clSheet(sheetName)}`

  const result =
    `${sheetNamePrefix} ${idUI} ${durationUI} ${dateUI}: ${descriptionUI}`.trim()

  if (isActive === true) {
    log(colors.bold(`  ${clHighlight('*')} ${result}`))
  } else {
    log(`    ${result}`)
  }
}

export default printSheetEntry
