import { type YArgsOptionDefinition } from '../types'

const FILTER_OPTION: YArgsOptionDefinition = [
  'filter',
  {
    alias: ['f'],
    describe: 'Filter results by description',
    type: 'string'
  }
]

export default FILTER_OPTION
