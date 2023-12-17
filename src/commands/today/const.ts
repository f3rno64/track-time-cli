import * as O from '../../options'

export const CONFIG = {
  command: 'today [sheets..]',
  describe: 'Display a summary of activity for today',
  aliases: ['t'],
  builder: O.setup.bind(null, [
    O.SheetsOption,
    O.AgoOption,
    O.HumanizeOption,
    O.AllOption
  ])
}
