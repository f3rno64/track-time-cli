import * as O from '../../options'

export const CONFIG = {
  command: 'week [sheets..]',
  describe: 'Display a summary of activity for the past week',
  aliases: ['w'],
  builder: O.setup.bind(null, [
    O.TotalOption,
    O.AgoOption,
    O.HumanizeOption,
    O.SheetsOption
  ])
}
