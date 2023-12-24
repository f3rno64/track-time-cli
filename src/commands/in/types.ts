import { type Argv } from 'yargs'

import DB from '../../db'

export interface InCommandArgs {
  db: DB
  yargs: Argv
  description: string[]
  sheet?: string
  at?: string
  help?: boolean
}
