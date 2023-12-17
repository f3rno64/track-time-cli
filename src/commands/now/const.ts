import * as O from '../../options'

export const CONFIG = {
  command: ['now', '$0'],
  describe: 'Display all active time sheet entries',
  aliases: ['n'],
  builder: O.setup.bind(null, [O.HumanizeOption])
}
