import { type YArgsOptionDefinition } from '../types'

const AGO_OPTION: YArgsOptionDefinition = [
  'ago',
  {
    describe: 'Print dates as relative time (e.g. 5 minutes ago)',
    alias: ['r', 'relative'],
    type: 'boolean'
  }
]

export default AGO_OPTION
