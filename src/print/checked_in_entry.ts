import { clTag, clHighlight, clID, clText } from '../color'
import log from '../log'
import { type TimeSheetEntry } from '../types'

const printCheckedInEntry = (entry: TimeSheetEntry): void => {
  const { tags, description, id } = entry
  const idUI = clID(`${id}`)
  const descriptionUI = clHighlight(description)
  const tagsUI = (tags ?? []).map(clTag).join(' ')

  log(`${clText('Checked in')}: ${descriptionUI} [${idUI}] ${tagsUI}`.trim())
}

export default printCheckedInEntry
