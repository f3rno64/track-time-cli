import { type Argv } from 'yargs'

import DB from '../../db'

export interface SheetCommandArgs {
  db: DB
  yargs: Argv
  delete?: boolean
  name?: string
  help?: boolean
}
