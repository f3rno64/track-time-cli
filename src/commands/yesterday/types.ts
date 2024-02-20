import { type Argv } from 'yargs'

import DB from '../../db'

export interface YesterdayCommandArgs {
  db: DB
  yargs: Argv
  all?: boolean
  help?: boolean
  sheets?: string[]
  absolute?: boolean
  humanize?: boolean
}
