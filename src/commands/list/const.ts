import {
  setup,
  AgoOption,
  AllOption,
  HelpOption,
  SinceOption,
  TodayOption,
  FilterOption,
  SheetsOption,
  ConciseOption,
  HumanizeOption,
  YesterdayOption,
  AllSheetsOption
} from '../../options'

export const CONFIG = {
  aliases: ['l'],
  command: 'list [sheets..]',
  describe: 'List all time sheet entries',
  builder: setup.bind(null, [
    SheetsOption,
    AgoOption,
    HumanizeOption,
    SinceOption,
    TodayOption,
    AllSheetsOption,
    AllOption,
    YesterdayOption,
    ConciseOption,
    FilterOption,
    HelpOption
  ])
}
