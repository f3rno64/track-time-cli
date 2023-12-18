import os from 'os'
import path from 'path'

import DB from '../db'

const TEMP_DIR_PATH = os.tmpdir()

const getTestDB = (): DB => {
  const dbFileName = `test-db-${Math.floor(Math.random() * 10000)}.json`
  const dbPath = path.join(TEMP_DIR_PATH, dbFileName)

  return new DB(dbPath)
}

export default getTestDB
