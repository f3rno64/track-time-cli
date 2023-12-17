import DB from '../../db'

export interface NowCommandArgs {
  db: DB
  humanize?: boolean
}
