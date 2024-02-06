import {
  setup,
  HelpOption,
  TodayOption,
  SinceOption,
  HumanizeOption
} from '../../options'

export const CONFIG = {
  aliases: ['ss'],
  command: 'sheets',
  describe: 'List all sheets',
  builder: setup.bind(null, [
    HumanizeOption,
    SinceOption,
    TodayOption,
    HelpOption
  ])
}
