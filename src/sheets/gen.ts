import { type TimeSheet } from 'types'

const genSheet = (name: string): TimeSheet => ({
  name,
  entries: [],
  activeEntryID: null
})

export default genSheet
