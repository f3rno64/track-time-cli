import os from 'os'
import path from 'path'

export const DB_FILE_NAME = 'db.json'
export const STORAGE_DIR_NAME = '.time-tracker-cli'
export const STORAGE_PATH = path.join(os.homedir(), STORAGE_DIR_NAME)
export const DB_PATH = path.join(STORAGE_PATH, DB_FILE_NAME)
