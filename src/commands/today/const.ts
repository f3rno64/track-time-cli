import {
  setup,
  AgoOption,
  HelpOption,
  SheetsOption,
  HumanizeOption,
  AllSheetsOption
} from '../../options'

export const CONFIG = {
  aliases: ['t'],
  command: 'today [sheets..]',
  describe: 'Display a summary of activity for today',
  builder: setup.bind(null, [
    SheetsOption,
    AgoOption,
    HumanizeOption,
    AllSheetsOption,
    HelpOption
  ])
}
