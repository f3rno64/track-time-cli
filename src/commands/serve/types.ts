import { type Argv } from 'yargs'

import DB from '../../db'

export interface ServeCommandArgs {
  db: DB
  yargs: Argv
  port?: number
  hostname?: string
}
