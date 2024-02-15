import { ITimeTrackerDB, ITimeSheetEntry, ITimeSheet } from './generic_data'

export type TimeTrackerDB = ITimeTrackerDB<Date>
export type TimeSheetEntry = ITimeSheetEntry<Date>
export type TimeSheet = ITimeSheet<Date>

export type JSONTimeTrackerDB = ITimeTrackerDB<number>
export type JSONTimeSheetEntry = ITimeSheetEntry<number>
export type JSONTimeSheet = ITimeSheet<number>
