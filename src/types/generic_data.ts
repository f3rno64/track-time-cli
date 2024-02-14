export interface ITimeSheetEntry<T> {
  id: number
  start: T
  end: T | null
  description: string
  tags: string[]
}

export interface ITimeSheet<T> {
  name: string
  entries: ITimeSheetEntry<T>[]
  activeEntryID: number | null
}

export interface ITimeTrackerDB<T> {
  sheets: ITimeSheet<T>[]
  activeSheetName: string | null
  version: number
}
