import ago from 's-ago'

import * as C from '../color'
import { type TimeSheetEntry } from '../types'

const printCheckedInEntry = (entry: TimeSheetEntry): void => {
  const { id, start, description } = entry
  const idUI = C.clID(`${id}`)
  const startUI = C.clDateAgo(ago(start))
  const descriptionUI = C.clText(description)

  console.log(
    `${C.clText('Checked in at')} ${startUI}: ${descriptionUI} [${idUI}]`
  )
}

export default printCheckedInEntry
