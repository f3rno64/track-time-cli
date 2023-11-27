export interface TimeSheetEntry {
  id: number
  start: Date
  end: Date | null
  description: string
}

export interface TimeSheet {
  name: string
  entries: TimeSheetEntry[]
  activeEntryID: number | null
}

export interface TimeTrackerDB {
  sheets: TimeSheet[]
  activeSheetName: string | null
}
