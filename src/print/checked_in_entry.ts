import { clHighlight, clID, clText } from '../color'
import log from '../log'
import { type TimeSheetEntry } from '../types'

const printCheckedInEntry = (entry: TimeSheetEntry): void => {
  const { description, id } = entry
  const idUI = clID(`${id}`)
  const descriptionUI = clHighlight(description)

  log(`${clText('Checked in')}: ${descriptionUI} [${idUI}]`)
}

export default printCheckedInEntry
