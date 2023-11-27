import genDB from './gen'
import saveDB from './save'
import { type TimeTrackerDB } from '../types'

const initDB = async (): Promise<TimeTrackerDB> => {
  const db = genDB()

  await saveDB(db)

  return db
}

export default initDB
