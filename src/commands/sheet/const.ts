import * as O from '../../options'

export const CONFIG = {
  command: 'sheet [name]',
  describe: 'Switch to or delete a sheet by name',
  aliases: ['s'],
  builder: O.setup.bind(null, [O.DeleteOption, O.NameOption])
}
