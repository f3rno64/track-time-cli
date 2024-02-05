import * as O from '../../options'

export const CONFIG = {
  command: 'edit [description..]',
  describe: 'View, edit, or delete a time sheet entry',
  aliases: ['e'],
  builder: O.setup.bind(null, [
    O.SheetOption,
    O.NameOption,
    O.EntryOption,
    O.DescriptionOption,
    O.DeleteOption,
    O.HelpOption
  ])
}
