import { type Argv } from 'yargs'

import DB from '../../db'

export interface EditCommandArgs {
  db: DB
  yargs: Argv
  sheet?: string
  name?: string
  entry?: string
  description?: string
  delete?: boolean
  start?: string
  end?: string
}
