import { type YArgsOptionDefinition } from '../types'

const SINCE_OPTION: YArgsOptionDefinition = [
  'since',
  {
    alias: 's',
    description: 'Only list entries since the specified date',
    type: 'string'
  }
]

export default SINCE_OPTION
