import ago from 's-ago'
import colors from 'colors'
import formatDuration from 'format-duration'

import * as C from '../color'
import { type TimeSheetEntry } from '../types'

const printSheetEntry = (entry: TimeSheetEntry, isActive?: boolean): void => {
  const { id, start, end, description } = entry
  const idUI = C.clID(`${id}`)
  const startUI = C.clDateAgo(ago(start))
  const finalEnd = end === null ? new Date() : end
  const descriptionUI = C.clText(description)
  const durationUI = C.clDuration(formatDuration(+finalEnd - +start))
  const endedUI = end === null ? '' : C.clDateAgo(ago(end))
  const startEndUI = end === null ? `started ${startUI}` : `ended ${endedUI}`

  const result = `(${idUI}) [${durationUI}] ${descriptionUI}: ${startEndUI}`

  if (isActive === true) {
    console.log(colors.bold(`  ${C.clHighlight('*')} ${result}`))
  } else {
    console.log(`    ${result}`)
  }
}

export default printSheetEntry
