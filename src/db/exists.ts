import { promises as fs } from 'fs'

import { DB_PATH } from '../config'

const dbExists = async (): Promise<boolean> => {
  try {
    await fs.access(DB_PATH)
    return true
  } catch (err) {
    return false
  }
}

export default dbExists
