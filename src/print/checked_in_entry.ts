import log from '../log'
import * as C from '../color'
import { type TimeSheetEntry } from '../types'

const printCheckedInEntry = (entry: TimeSheetEntry): void => {
  const { id, description } = entry
  const idUI = C.clID(`${id}`)
  const descriptionUI = C.clHighlight(description)

  log(`${C.clText('Checked in')}: ${descriptionUI} [${idUI}]`)
}

export default printCheckedInEntry
