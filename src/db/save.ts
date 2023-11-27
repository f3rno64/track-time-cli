import { promises as fs } from 'fs'

import { DB_PATH } from '../config'
import { type TimeTrackerDB } from '../types'

const saveDB = async (db: TimeTrackerDB): Promise<void> => {
  const dbJSON = JSON.stringify(db)

  await fs.writeFile(DB_PATH, dbJSON)
}

export default saveDB
