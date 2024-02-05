import * as O from '../../options'

export const CONFIG = {
  command: 'resume',
  describe: 'Start a new entry with the same description as the previous one',
  aliases: ['r'],
  builder: O.setup.bind(null, [O.HelpOption])
}
