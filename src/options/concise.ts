import { type YArgsOptionDefinition } from '../types'

const CONCISE_OPTION: YArgsOptionDefinition = [
  'concise',
  {
    describe: 'Exclude start and end dates from output, showing duration only',
    alias: ['c'],
    type: 'boolean'
  }
]

export default CONCISE_OPTION
