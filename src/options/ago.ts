import { type YArgsOptionDefinition } from '../types'

const AGO_OPTION: YArgsOptionDefinition = [
  'ago',
  {
    alias: ['r', 'relative'],
    describe: 'Print dates as relative time (e.g. 5 minutes ago)',
    type: 'boolean'
  }
]

export default AGO_OPTION
