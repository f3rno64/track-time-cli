import parseDate from 'time-speak'
import _isEmpty from 'lodash/isEmpty'
import _isFinite from 'lodash/isFinite'

import log from '../../log'
import * as C from '../../color'
import * as U from '../../utils'
import { type EditCommandArgs } from './types'

const handler = async (args: EditCommandArgs): Promise<void> => {
  const {
    db,
    end,
    start,
    delete: del,
    name: inputName,
    entry: inputEntry,
    sheet: inputSheet,
    description: inputDescription
  } = args

  const activeSheetName = db.getActiveSheetName()
  const finalSheetName = _isEmpty(inputSheet) ? activeSheetName : inputSheet
  const description = U.parseVariadicArg(inputDescription)

  if (
    typeof finalSheetName === 'undefined' ||
    finalSheetName === null ||
    _isEmpty(finalSheetName)
  ) {
    throw new Error('No sheet specified and none active')
  }

  const sheet = db.getSheet(finalSheetName)
  const { activeEntryID } = sheet
  const finalEntryID =
    inputEntry === null ||
    typeof inputEntry === 'undefined' ||
    !_isFinite(+inputEntry)
      ? activeEntryID
      : +inputEntry

  if (finalEntryID !== null && _isFinite(finalEntryID)) {
    const entry = db.getSheetEntry(finalSheetName, finalEntryID)

    if (del) {
      await db.removeSheetEntry(sheet, entry)

      log(
        `${C.clText('Deleted entry')} ${C.clHighlight(
          `${finalEntryID}`
        )} ${C.clText('from sheet')} ${C.clSheet(finalSheetName)}`
      )
    } else if (typeof description !== 'undefined' && !_isEmpty(description)) {
      entry.description = description

      await db.save()

      log(
        `${C.clText('Updated entry')} ${C.clHighlight(
          `${finalEntryID}`
        )} ${C.clText('in sheet')} ${C.clSheet(finalSheetName)}: ${C.clText(
          description
        )}`
      )
    } else if (!_isEmpty(start)) {
      const startDate = parseDate(start)
      entry.start = startDate

      await db.save()

      log(
        `${C.clText('Updated entry')} ${C.clHighlight(
          `${finalEntryID}`
        )} ${C.clText('start date to')} ${C.clDate(startDate.toLocaleString())}`
      )
    } else if (!_isEmpty(end)) {
      const endDate = parseDate(end)
      entry.end = endDate

      await db.save()

      log(
        `${C.clText('Updated entry')} ${C.clHighlight(
          `${finalEntryID}`
        )} ${C.clText('end date to')} ${C.clDate(endDate.toLocaleString())}`
      )
    }
  } else {
    if (del) {
      await db.removeSheet(finalSheetName)

      log(`${C.clText('Deleted sheet')} ${C.clSheet(finalSheetName)}`)
    } else if (typeof inputName !== 'undefined' && !_isEmpty(inputName)) {
      await db.renameSheet(sheet.name, inputName)

      log(
        `${C.clText('Renamed sheet')} ${C.clSheet(finalSheetName)} ${C.clText(
          'to'
        )} ${C.clHighlight(inputName)}`
      )
    } else {
      throw new Error(`No new name specified for sheet ${finalSheetName}`)
    }
  }
}

export default handler
