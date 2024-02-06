import { type Argv } from 'yargs'

import DB from '../../db'

export interface SheetCommandArgs {
  db: DB
  yargs: Argv
  name?: string
  help?: boolean
  delete?: boolean
}
