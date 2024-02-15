import { type TimeSheetEntry } from '../types'

const parseEntryFromInput = (
  id: number,
  input: string,
  start?: Date,
  end?: Date | null
): TimeSheetEntry => {
  const tags = input.match(/@\w+/g) || []
  const description = input.split(/@\w+/).join(' ').trim()

  return {
    id,
    tags,
    description,
    start: start ?? new Date(),
    end: end ?? null
  } as TimeSheetEntry
}

export default parseEntryFromInput
export { parseEntryFromInput }
