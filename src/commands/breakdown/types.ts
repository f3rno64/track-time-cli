import { type Argv } from 'yargs'

import DB from '../../db'

export interface BreakdownCommandArgs {
  db: DB
  yargs: Argv
  sheets?: string[]
  humanize?: boolean
  all?: boolean
  since?: string
  ago?: boolean
  help?: boolean
}
