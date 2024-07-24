import parseDate from 'time-speak'
import _isNil from 'lodash/isNil'
import _isEmpty from 'lodash/isEmpty'
import _isFinite from 'lodash/isFinite'
import _isUndefined from 'lodash/isUndefined'

import log from '../../log'
import { parseVariadicArg } from '../../utils'
import { type EditCommandArgs } from './types'
import { clDate, clHighlight, clSheet, clText } from '../../color'

// eslint-disable-next-line sonarjs/cognitive-complexity
const handler = async (args: EditCommandArgs): Promise<void> => {
  const {
    db,
    end,
    help,
    yargs,
    start,
    delete: del,
    name: inputName,
    entry: inputEntry,
    sheet: inputSheet,
    description: inputDescription
  } = args

  if (help) {
    yargs.showHelp()
    process.exit(0)
  }

  const activeSheetName = db.getActiveSheetName()
  const description = parseVariadicArg(inputDescription)
  const finalSheetName = _isEmpty(inputSheet) ? activeSheetName : inputSheet

  if (_isNil(finalSheetName) || _isEmpty(finalSheetName)) {
    throw new Error('No sheet specified and none active')
  }

  const sheet = db.getSheet(finalSheetName)
  const { activeEntryID } = sheet
  const finalEntryID =
    _isNil(inputEntry) || !_isFinite(+inputEntry) ? activeEntryID : +inputEntry

  if (finalEntryID !== null && _isFinite(finalEntryID)) {
    const entry = db.getSheetEntry(finalSheetName, finalEntryID)

    if (del) {
      await db.removeSheetEntry(sheet, entry)

      if (activeEntryID === entry.id) {
        sheet.activeEntryID = null

        await db.save()
      }

      log(
        `${clText('Deleted entry')} ${clHighlight(
          `${finalEntryID}`
        )} ${clText('from sheet')} ${clSheet(finalSheetName)}`
      )
    } else if (!_isUndefined(description) && !_isEmpty(description)) {
      entry.description = description

      await db.save()

      log(
        `${clText('Updated entry')} ${clHighlight(
          `${finalEntryID}`
        )} ${clText('in sheet')} ${clSheet(finalSheetName)}: ${clText(
          description
        )}`
      )
    } else if (!_isUndefined(start) && !_isEmpty(start)) {
      const startDate = new Date(+parseDate(start))
      entry.start = startDate

      await db.save()

      log(
        `${clText('Updated entry')} ${clHighlight(
          `${finalEntryID}`
        )} ${clText('start date to')} ${clDate(startDate.toLocaleString())}`
      )
    } else if (!_isUndefined(end) && !_isEmpty(end)) {
      const endDate = new Date(+parseDate(end))
      entry.end = endDate

      await db.save()

      log(
        `${clText('Updated entry')} ${clHighlight(
          `${finalEntryID}`
        )} ${clText('end date to')} ${clDate(endDate.toLocaleString())}`
      )
    }
  } else if (del) {
    await db.removeSheet(finalSheetName)

    log(`${clText('Deleted sheet')} ${clSheet(finalSheetName)}`)
  } else if (!_isUndefined(inputName) && !_isEmpty(inputName)) {
    await db.renameSheet(sheet.name, inputName)

    log(
      `${clText('Renamed sheet')} ${clSheet(finalSheetName)} ${clText(
        'to'
      )} ${clHighlight(inputName)}`
    )
  } else {
    throw new Error(`No new name specified for sheet ${finalSheetName}`)
  }
}

export default handler
