import path from 'path'
import { promises as fs } from 'fs'

import genDB from './gen'
import saveDB from './save'
import { type TimeTrackerDB } from '../types'
import { TEST_DB_PATH, DB_PATH } from '../config'

const { NODE_ENV } = process.env

const initDB = async (): Promise<TimeTrackerDB> => {
  const db = genDB()
  const dbPath = NODE_ENV === 'test' ? TEST_DB_PATH : DB_PATH
  const pathDir = path.dirname(dbPath)

  try {
    await fs.access(pathDir)
  } catch (err: unknown) {
    await fs.mkdir(pathDir)
  }

  await saveDB(db)

  return db
}

export default initDB
