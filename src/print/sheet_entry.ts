import ago from 's-ago'
import colors from 'colors'
import humanizeDuration from 'humanize-duration'

import * as C from '../color'
import { type TimeSheetEntry } from '../types'

const printSheetEntry = (entry: TimeSheetEntry, isActive?: boolean): void => {
  const { id, start, end, description } = entry
  const idUI = C.clID(`${id + 1}`)
  const startUI = C.clDateAgo(ago(start))
  const finalEnd = end === null ? new Date() : end
  const descriptionUI = C.clText(description)
  const durationUI = C.clDuration(humanizeDuration(+finalEnd - +start))
  const result = `[${idUI}] ${descriptionUI}: ${C.clHighlight(
    'started'
  )} ${startUI} [${durationUI}]`

  if (isActive === true) {
    console.log(colors.bold(`  ${C.clHighlight('*')} ${result}`))
  } else {
    console.log(`    ${result}`)
  }
}

export default printSheetEntry
