import * as O from '../../options'

export const CONFIG = {
  command: 'in <description..>',
  describe: 'Check in to a time sheet',
  aliases: ['i'],
  builder: O.setup.bind(null, [O.AtOption, O.DescriptionOption])
}
