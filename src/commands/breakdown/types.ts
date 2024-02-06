import { type Argv } from 'yargs'

import DB from '../../db'

export interface BreakdownCommandArgs {
  db: DB
  yargs: Argv
  ago?: boolean
  all?: boolean
  help?: boolean
  since?: string
  sheets?: string[]
  humanize?: boolean
}
