import { type Argv } from 'yargs'

import DB from '../../db'

export interface SheetsCommandArgs {
  db: DB
  yargs: Argv
  help?: boolean
  since?: string
  today?: boolean
  humanize?: boolean
}
