import { type Argv } from 'yargs'
import DB from '../../db'

export interface YesterdayCommandArgs {
  db: DB
  yargs: Argv
  sheets?: string[]
  all?: boolean
  ago?: boolean
  humanize?: boolean
  help?: boolean
}
