import { type TimeTrackerDB } from '../types'

const genDB = () =>
  ({
    sheets: [],
    activeSheetName: null
  }) as TimeTrackerDB

export default genDB
