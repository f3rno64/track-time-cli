import * as O from '../../options'

export const CONFIG = {
  command: 'sheets',
  describe: 'List all sheets',
  aliases: ['ss'],
  builder: O.setup.bind(null, [
    O.HumanizeOption,
    O.SinceOption,
    O.TodayOption,
    O.HelpOption
  ])
}
