import {
  setup,
  HelpOption,
  SheetsOption,
  AbsoluteOption,
  HumanizeOption,
  AllSheetsOption
} from '../../options'

export const CONFIG = {
  aliases: ['t'],
  command: 'today [sheets..]',
  describe: 'Display a summary of activity for today',
  builder: setup.bind(null, [
    SheetsOption,
    AbsoluteOption,
    HumanizeOption,
    AllSheetsOption,
    HelpOption
  ])
}
