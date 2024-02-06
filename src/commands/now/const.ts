import { HelpOption, HumanizeOption, setup } from '../../options'

export const CONFIG = {
  command: ['now', '$0'],
  describe: 'Display all active time sheet entries',
  builder: setup.bind(null, [HumanizeOption, HelpOption])
}
