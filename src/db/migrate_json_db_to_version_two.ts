import _isUndefined from 'lodash/isUndefined'

import { type JSONTimeTrackerDB } from '../types'

/**
 * Creates the `tags` array on each sheet entry, which was addded in version 2.
 */
const migrateJSONDBToVersionTwo = (
  jsonDB: JSONTimeTrackerDB
): JSONTimeTrackerDB => {
  const {
    sheets: jsonSheets,
    version: jsonVersion,
    activeSheetName: jsonActiveSheetName
  } = jsonDB

  if (jsonVersion !== 1 && !_isUndefined(jsonVersion)) {
    throw new Error(
      `DB is version ${jsonVersion}, cannot migrate to version 2.`
    )
  }

  return {
    version: 2,
    activeSheetName: jsonActiveSheetName,
    sheets: jsonSheets.map(
      ({
        name: jsonName,
        entries: jsonEntries,
        activeEntryID: jsonActiveEntryID
      }) => ({
        name: jsonName,
        activeEntryID: jsonActiveEntryID,
        entries: jsonEntries.map(
          ({
            id: jsonId,
            start: jsonStart,
            end: jsonEnd,
            description: jsonDescription
          }) => ({
            tags: [],
            id: jsonId,
            end: jsonEnd,
            start: jsonStart,
            description: jsonDescription
          })
        )
      })
    )
  } as JSONTimeTrackerDB
}

export default migrateJSONDBToVersionTwo
export { migrateJSONDBToVersionTwo }
