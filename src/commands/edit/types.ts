import { type Argv } from 'yargs'

import DB from '../../db'

export interface EditCommandArgs {
  db: DB
  yargs: Argv
  end?: string
  name?: string
  entry?: string
  help?: boolean
  sheet?: string
  start?: string
  delete?: boolean
  description?: string
}
