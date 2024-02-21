import { AtOption, DescriptionOption, HelpOption, setup } from '../../options'

export const CONFIG = {
  aliases: ['i'],
  command: 'in [description..]',
  describe: 'Check in to a time sheet',
  builder: setup.bind(null, [AtOption, DescriptionOption, HelpOption])
}
