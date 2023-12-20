import { type Argv } from 'yargs'

import DB from '../../db'

export interface NowCommandArgs {
  db: DB
  yargs: Argv
  help?: boolean
  humanize?: boolean
}
