import * as O from '../../options'

export const CONFIG = {
  command: 'resume',
  describe: 'Resume the last active entry',
  aliases: ['r'],
  builder: O.setup.bind(null, [O.HelpOption])
}
