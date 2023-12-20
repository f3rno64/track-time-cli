import { type Argv } from 'yargs'

import DB from '../../db'

export interface OutCommandArgs {
  db: DB
  yargs: Argv
  at?: string[]
}
