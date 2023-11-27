import { promises as fs } from 'fs'

import { DB_PATH } from '../config'
import { type TimeTrackerDB } from '../types'

const loadDB = async () => {
  let dbJSON = ''

  try {
    dbJSON = await fs.readFile(DB_PATH, 'utf-8')
  } catch (err: unknown) {
    throw new Error(`Failed to load DB (${DB_PATH}): ${err}`)
  }

  let db: TimeTrackerDB | null = null

  try {
    db = JSON.parse(dbJSON) as TimeTrackerDB
  } catch (err: unknown) {
    throw new Error(`DB contains invalid JSON: ${err}`)
  }

  db.sheets.forEach(({ entries }) => {
    entries.forEach((entry) => {
      const { start, end } = entry

      entry.start = new Date(start)
      entry.end = end === null ? null : new Date(end)
    })
  })

  return db
}

export default loadDB
