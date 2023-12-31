import ago from 's-ago'
import colors from 'colors'
import _isEmpty from 'lodash/isEmpty'
import _compact from 'lodash/compact'

import * as C from '../../color'
import * as U from '../../utils'
import { type TimeSheetEntry } from '../../types'

const getSheetEntryColumns = (
  entry: TimeSheetEntry,
  isActive?: boolean,
  sheetName?: string,
  printDateAgo?: boolean,
  humanize?: boolean,
  concise?: boolean
): string[] => {
  const { id, start, end, description } = entry
  const idUI = C.clID(`${id}`)
  const startUI = C.clDate(
    printDateAgo ? ago(start) : new Date(start).toLocaleString()
  )
  const finalEnd = end === null ? new Date() : end
  const descriptionUI = C.clText(description)
  const duration = +finalEnd - +start
  const finalDurationString = U.getDurationLangString(duration, humanize)

  const durationUI = C.clDuration(finalDurationString)

  // prettier-ignore
  const endUI =
    end === null
      ? ''
      : C.clDate(
        printDateAgo ? ago(end) : new Date(end).toLocaleString()
      )

  const sheetNamePrefix =
    typeof sheetName === 'undefined' || _isEmpty(sheetName)
      ? ''
      : `${C.clText('sheet')} ${C.clSheet(sheetName)}`

  return _compact([
    '  ',
    sheetNamePrefix,
    `(${idUI})`,
    `[${durationUI}]`,

    concise === true ? null : startUI,
    concise === true ? null : C.clHighlightRed('->'),

    // prettier-ignore
    concise === true
      ? null
      : end === null
        ? C.clHighlightRed('active')
        : endUI,

    descriptionUI
  ]).map((value: string): string => (isActive ? colors.bold(value) : value))
}

export default getSheetEntryColumns
