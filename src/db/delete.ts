import { promises as fs } from 'fs'

import { TEST_DB_PATH, DB_PATH } from '../config'

const { NODE_ENV } = process.env

const deleteDB = async (): Promise<void> => {
  const dbPath = NODE_ENV === 'test' ? TEST_DB_PATH : DB_PATH

  try {
    await fs.access(dbPath)
    await fs.rm(dbPath)
  } catch (err: unknown) {
    throw new Error(`No DB exists at path ${dbPath}`)
  }
}

export default deleteDB
