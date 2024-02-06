import { AtOption, HelpOption, setup } from '../../options'

export const CONFIG = {
  aliases: ['o'],
  command: 'out',
  describe: 'Check out of the active time sheet entry',
  builder: setup.bind(null, [AtOption, HelpOption])
}
