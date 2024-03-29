import { type Argv } from 'yargs'

import DB from '../../db'

export interface ListCommandArgs {
  db: DB
  yargs: Argv
  all?: boolean
  help?: boolean
  since?: string
  filter?: string
  today?: boolean
  concise?: boolean
  sheets?: string[]
  absolute?: boolean
  humanize?: boolean
  allSheets?: boolean
  yesterday?: boolean
}
