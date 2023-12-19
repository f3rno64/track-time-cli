import * as O from '../../options'

export const CONFIG = {
  command: 'breakdown [sheets..]',
  describe: 'Display total durations per day for one or more sheets',
  aliases: ['b'],
  builder: O.setup.bind(null, [
    O.AllSheetsOption,
    O.AgoOption,
    O.HumanizeOption,
    O.SinceOption
  ])
}
