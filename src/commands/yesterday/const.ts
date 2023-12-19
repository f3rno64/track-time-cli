import * as O from '../../options'

export const CONFIG = {
  command: 'yesterday [sheets..]',
  describe: 'Display a summary of activity for yesterday',
  aliases: ['y'],
  builder: O.setup.bind(null, [
    O.SheetsOption,
    O.AgoOption,
    O.HumanizeOption,
    O.AllSheetsOption
  ])
}
