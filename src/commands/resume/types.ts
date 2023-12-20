import { type Argv } from 'yargs'

import DB from '../../db'

export interface ResumeCommandArgs {
  db: DB
  yargs: Argv
}
