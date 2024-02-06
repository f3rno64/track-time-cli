import { type Argv } from 'yargs'

import DB from '../../db'

export interface InCommandArgs {
  db: DB
  at?: string
  yargs: Argv
  help?: boolean
  sheet?: string
  description: string[]
}
