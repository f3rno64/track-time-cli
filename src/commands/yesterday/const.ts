import {
  setup,
  HelpOption,
  SheetsOption,
  AbsoluteOption,
  HumanizeOption,
  AllSheetsOption
} from '../../options'

export const CONFIG = {
  aliases: ['y'],
  command: 'yesterday [sheets..]',
  describe: 'Display a summary of activity for yesterday',
  builder: setup.bind(null, [
    SheetsOption,
    AbsoluteOption,
    HumanizeOption,
    AllSheetsOption,
    HelpOption
  ])
}
