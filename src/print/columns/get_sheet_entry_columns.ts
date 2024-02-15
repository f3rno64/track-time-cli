import ago from 's-ago'
import colors from 'colors'
import _compact from 'lodash/compact'
import _isEmpty from 'lodash/isEmpty'
import _isUndefined from 'lodash/isUndefined'

import { type TimeSheetEntry } from '../../types'
import { getDurationLangString } from '../../utils'
import {
  clID,
  clTag,
  clText,
  clDate,
  clSheet,
  clDuration,
  clHighlightRed
} from '../../color'

const getSheetEntryColumns = (
  entry: TimeSheetEntry,
  isActive?: boolean,
  sheetName?: string,
  printDateAgo?: boolean,
  humanize?: boolean,
  concise?: boolean
): string[] => {
  const { tags, description, end, id, start } = entry
  const idUI = clID(`${id}`)
  const startUI = clDate(
    printDateAgo ? (ago(start) as string) : new Date(start).toLocaleString()
  )

  const finalEnd = end === null ? new Date() : end
  const descriptionUI = clText(description)
  const duration = +finalEnd - +start
  const finalDurationString = getDurationLangString(duration, humanize)

  const durationUI = clDuration(finalDurationString)

  // prettier-ignore
  const endUI =
    end === null
      ? ''
      : clDate(
        printDateAgo ? (ago(end) as string): new Date(end).toLocaleString()
      )

  const sheetNamePrefix =
    _isUndefined(sheetName) || _isEmpty(sheetName)
      ? ''
      : `${clText('sheet')} ${clSheet(sheetName)}`

  return _compact([
    '  ',
    sheetNamePrefix,
    `(${idUI})`,
    `[${durationUI}]`,

    concise === true ? null : startUI,
    concise === true ? null : clHighlightRed('->'),

    // prettier-ignore
    concise === true
      ? null
      : end === null
        ? clHighlightRed('active')
        : endUI,

    descriptionUI,
    (tags ?? []).map(clTag).join(' ')
  ]).map((value: string): string => (isActive ? colors.bold(value) : value))
}

export default getSheetEntryColumns
