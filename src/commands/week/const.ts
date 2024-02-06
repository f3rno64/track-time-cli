import {
  setup,
  AgoOption,
  HelpOption,
  TotalOption,
  SheetsOption,
  HumanizeOption
} from '../../options'

export const CONFIG = {
  aliases: ['w'],
  command: 'week [sheets..]',
  describe: 'Display a summary of activity for the past week',
  builder: setup.bind(null, [
    TotalOption,
    AgoOption,
    HumanizeOption,
    SheetsOption,
    HelpOption
  ])
}
