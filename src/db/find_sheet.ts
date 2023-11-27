import { type TimeTrackerDB, type TimeSheet } from '../types'

const findSheet = (db: TimeTrackerDB, name: string): TimeSheet | undefined => {
  const { sheets } = db

  return sheets.find((sheet) => sheet.name === name)
}

export default findSheet
