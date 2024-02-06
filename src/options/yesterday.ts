import { type YArgsOptionDefinition } from '../types'

const YESTERDAY_OPTION: YArgsOptionDefinition = [
  'yesterday',
  {
    alias: 'y',
    describe: 'Show results from yesterday',
    type: 'boolean'
  }
]

export default YESTERDAY_OPTION
