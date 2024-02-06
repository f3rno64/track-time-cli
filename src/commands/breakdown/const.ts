import {
  setup,
  AgoOption,
  HelpOption,
  SinceOption,
  HumanizeOption,
  AllSheetsOption
} from '../../options'

export const CONFIG = {
  aliases: ['b'],
  command: 'breakdown [sheets..]',
  describe: 'Display total durations per day for one or more sheets',
  builder: setup.bind(null, [
    AllSheetsOption,
    AgoOption,
    HumanizeOption,
    SinceOption,
    HelpOption
  ])
}
