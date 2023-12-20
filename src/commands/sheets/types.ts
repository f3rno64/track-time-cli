import { type Argv } from 'yargs'

import DB from '../../db'

export interface SheetsCommandArgs {
  db: DB
  yargs: Argv
  humanize?: boolean
  since?: string
  today?: boolean
}
