import { promises as fs } from 'fs'

import { type TimeTrackerDB } from '../types'
import { TEST_DB_PATH, DB_PATH } from '../config'

const { NODE_ENV } = process.env

const saveDB = async (db: TimeTrackerDB): Promise<void> => {
  const dbJSON = JSON.stringify(db)
  const dbPath = NODE_ENV === 'test' ? TEST_DB_PATH : DB_PATH

  await fs.writeFile(dbPath, dbJSON)
}

export default saveDB
