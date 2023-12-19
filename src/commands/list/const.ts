import * as O from '../../options'

export const CONFIG = {
  command: 'list [sheets..]',
  describe: 'List all time sheet entries',
  aliases: ['l'],
  builder: O.setup.bind(null, [
    O.SheetsOption,
    O.AgoOption,
    O.HumanizeOption,
    O.SinceOption,
    O.TodayOption,
    O.AllSheetsOption,
    O.AllOption,
    O.YesterdayOption
  ])
}
