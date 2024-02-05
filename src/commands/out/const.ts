import * as O from '../../options'

export const CONFIG = {
  command: 'out',
  describe: 'Check out of the active time sheet entry',
  aliases: ['o'],
  builder: O.setup.bind(null, [O.AtOption, O.HelpOption])
}
