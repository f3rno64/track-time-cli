import { promises as fs } from 'fs'

import genDB from './gen'
import saveDB from './save'
import { STORAGE_PATH } from '../config'
import { type TimeTrackerDB } from '../types'

const initDB = async (): Promise<TimeTrackerDB> => {
  const db = genDB()

  try {
    await fs.access(STORAGE_PATH)
  } catch (err: unknown) {
    await fs.mkdir(STORAGE_PATH)
  }

  await saveDB(db)

  return db
}

export default initDB
