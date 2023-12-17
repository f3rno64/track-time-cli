import ago from 's-ago'
import colors from 'colors'
import _isEmpty from 'lodash/isEmpty'

import * as C from '../../color'
import * as U from '../../utils'
import { type TimeSheetEntry } from '../../types'

const getSheetEntryColumns = (
  entry: TimeSheetEntry,
  isActive?: boolean,
  sheetName?: string,
  printDateAgo?: boolean,
  humanize?: boolean
): string[] => {
  const { id, start, end, description } = entry
  const idUI = C.clID(`${id}`)
  const startUI = C.clDate(
    printDateAgo ? ago(start) : new Date(start).toLocaleDateString()
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
        printDateAgo ? ago(start) : new Date(end).toLocaleDateString()
      )

  const dateUI = end === null ? startUI : endUI
  const sheetNamePrefix =
    typeof sheetName === 'undefined' || _isEmpty(sheetName)
      ? ''
      : `${C.clText('sheet')} ${C.clSheet(sheetName)}`

  return [
    sheetNamePrefix,
    `(${idUI})`,
    `[${durationUI}]`,
    `started ${dateUI}`,
    descriptionUI
  ].map((value: string): string =>
    isActive ? colors.bold.underline(value) : value
  )
}

export default getSheetEntryColumns
