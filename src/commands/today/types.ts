import { type Argv } from 'yargs'

import DB from '../../db'

export interface TodayCommandArgs {
  db: DB
  yargs: Argv
  all?: boolean
  help?: boolean
  sheets?: string[]
  absolute?: boolean
  humanize?: boolean
}
