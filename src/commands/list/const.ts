import {
  setup,
  AllOption,
  HelpOption,
  SinceOption,
  TodayOption,
  FilterOption,
  SheetsOption,
  ConciseOption,
  HumanizeOption,
  AbsoluteOption,
  YesterdayOption,
  AllSheetsOption
} from '../../options'

export const CONFIG = {
  aliases: ['l'],
  command: 'list [sheets..]',
  describe: 'List all time sheet entries',
  builder: setup.bind(null, [
    SheetsOption,
    AbsoluteOption,
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
