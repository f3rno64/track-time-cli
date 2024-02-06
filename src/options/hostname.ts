import { type YArgsOptionDefinition } from '../types'

const HOSTNAME_OPTION: YArgsOptionDefinition = [
  'hostname',
  {
    default: 'localhost',
    describe: 'Hostname to bind to',
    type: 'string'
  }
]

export default HOSTNAME_OPTION
