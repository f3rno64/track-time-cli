import ago from 's-ago'
import humanizeDuration from 'humanize-duration'

import * as C from '../color'
import { type TimeSheetEntry } from '../types'

const printSheetEntry = (entry: TimeSheetEntry): void => {
  const { id, start, end, description } = entry
  const idUI = C.clID(`${id + 1}`)
  const startUI = C.clDateAgo(ago(start))
  const finalEnd = end === null ? new Date() : end
  const endUI = C.clDateAgo(ago(finalEnd))
  const descriptionUI = C.clText(description)
  const durationUI = C.clDuration(humanizeDuration(+finalEnd - +start))
  const startUIPrefixed =
    end === null ? `${C.clText('started')} ${startUI}` : `${startUI}`
  const intervalUI = end === null ? startUIPrefixed : `${startUI} -> ${endUI}`

  console.log(`  * [${idUI}] ${descriptionUI}: ${intervalUI} [${durationUI}]`)
}

export default printSheetEntry
