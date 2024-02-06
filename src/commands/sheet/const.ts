import { DeleteOption, HelpOption, NameOption, setup } from '../../options'

export const CONFIG = {
  aliases: ['s'],
  command: 'sheet [name]',
  describe: 'Switch to or delete a sheet by name',
  builder: setup.bind(null, [DeleteOption, NameOption, HelpOption])
}
