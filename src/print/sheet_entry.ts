import ago from 's-ago'
import colors from 'colors'
import _isEmpty from 'lodash/isEmpty'
import formatDuration from 'format-duration'

import log from '../log'
import * as C from '../color'
import { type TimeSheetEntry } from '../types'

const printSheetEntry = (
  entry: TimeSheetEntry,
  isActive?: boolean,
  sheetName?: string,
  printDateAgo?: boolean
): void => {
  const { id, start, end, description } = entry
  const idUI = C.clID(`${id}`)
  const startUI = C.clDate(
    printDateAgo ? ago(start) : new Date(start).toLocaleDateString()
  )
  const finalEnd = end === null ? new Date() : end
  const descriptionUI = C.clText(description)
  const durationUI = C.clDuration(formatDuration(+finalEnd - +start))

  // prettier-ignore
  const endUI =
    end === null
      ? ''
      : C.clDate(
        printDateAgo ? ago(start) : new Date(end).toLocaleDateString()
      )

  const dateUI = end === null ? startUI : endUI
  const sheetNamePrefix =
    typeof sheetName === 'undefined' || _isEmpty(sheetName)
      ? ''
      : `${C.clText('sheet')} ${C.clSheet(sheetName)}`

  const result =
    `${sheetNamePrefix} (${idUI}) [${durationUI}] ${dateUI}: ${descriptionUI}`.trim()

  if (isActive === true) {
    log(colors.bold(`  ${C.clHighlight('*')} ${result}`))
  } else {
    log(`    ${result}`)
  }
}

export default printSheetEntry
