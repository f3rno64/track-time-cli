import { type YArgsOptionDefinition } from '../types'

const HUMANIZE_OPTION: YArgsOptionDefinition = [
  'humanize',
  {
    describe: 'Print the total duration in human-readable format',
    alias: 'h',
    type: 'boolean'
  }
]

export default HUMANIZE_OPTION
