import { type TimeSheetEntry } from 'types'

const genSheetEntry = (
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

export default genSheetEntry
