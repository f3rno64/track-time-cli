import { type TimeTrackerDB, type JSONTimeTrackerDB } from '../types'

const convertJSONDB = (jsonDB: JSONTimeTrackerDB): TimeTrackerDB => {
  const {
    sheets: jsonSheets,
    version: jsonVersion,
    activeSheetName: jsonActiveSheetName
  } = jsonDB

  const sheets = jsonSheets.map(
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
          description: jsonDescription,
          tags: jsonTags
        }) => ({
          id: jsonId,
          description: jsonDescription,
          tags: jsonTags,
          start: new Date(jsonStart),
          end: jsonEnd === null ? null : new Date(jsonEnd)
        })
      )
    })
  )

  return {
    version: jsonVersion,
    activeSheetName: jsonActiveSheetName,
    sheets
  } as TimeTrackerDB
}

export default convertJSONDB
export { convertJSONDB }
