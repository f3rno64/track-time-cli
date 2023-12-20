import { type Argv } from 'yargs'

import DB from '../../db'

export interface ListCommandArgs {
  db: DB
  yargs: Argv
  sheets?: string[]
  ago?: boolean
  all?: boolean
  since?: string
  today?: boolean
  yesterday?: boolean
  humanize?: boolean
  allSheets?: boolean
  concise?: boolean
}
