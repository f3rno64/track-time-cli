import { type YArgsOptionDefinition } from '../types'

const SINCE_OPTION: YArgsOptionDefinition = [
  'since',
  {
    description: 'Only list entries since the specified date',
    alias: 's',
    type: 'string'
  }
]

export default SINCE_OPTION
