import { type TimeSheetEntry } from 'types'

const genEntry = (
  id: number,
  description: string,
  start?: Date,
  end?: Date | null
): TimeSheetEntry => ({
  id,
  description,
  start: start ?? new Date(),
  end: end ?? null
})

export default genEntry
