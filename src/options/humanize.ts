import { type YArgsOptionDefinition } from '../types'

const HUMANIZE_OPTION: YArgsOptionDefinition = [
  'humanize',
  {
    alias: 'h',
    describe: 'Print the total duration in human-readable format',
    type: 'boolean'
  }
]

export default HUMANIZE_OPTION
