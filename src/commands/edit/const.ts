import {
  setup,
  HelpOption,
  NameOption,
  SheetOption,
  EntryOption,
  DeleteOption,
  DescriptionOption
} from '../../options'

export const CONFIG = {
  aliases: ['e'],
  command: 'edit [description..]',
  describe: 'View, edit, or delete a time sheet entry',
  builder: setup.bind(null, [
    SheetOption,
    NameOption,
    EntryOption,
    DescriptionOption,
    DeleteOption,
    HelpOption
  ])
}
