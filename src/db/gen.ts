import { genSheet } from '../sheets'
import { type TimeTrackerDB } from '../types'

const genDB = () =>
  ({
    sheets: [genSheet('main')],
    activeSheetName: 'main'
  }) as TimeTrackerDB

export default genDB
