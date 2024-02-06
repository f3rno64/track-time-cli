import { HelpOption, setup } from '../../options'

export const CONFIG = {
  aliases: ['r'],
  command: 'resume',
  describe: 'Start a new entry with the same description as the previous one',
  builder: setup.bind(null, [HelpOption])
}
