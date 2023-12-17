import { type YArgsOptionDefinition } from '../types'

const YESTERDAY_OPTION: YArgsOptionDefinition = [
  'yesterday',
  {
    describe: 'Show results from yesterday',
    alias: 'y',
    type: 'boolean'
  }
]

export default YESTERDAY_OPTION
