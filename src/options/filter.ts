import { type YArgsOptionDefinition } from '../types'

const FILTER_OPTION: YArgsOptionDefinition = [
  'filter',
  {
    describe: 'Filter results by description',
    alias: ['f'],
    type: 'string'
  }
]

export default FILTER_OPTION
