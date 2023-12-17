import { type YArgsOptionDefinition } from '../types'

const HOSTNAME_OPTION: YArgsOptionDefinition = [
  'hostname',
  {
    describe: 'Hostname to bind to',
    type: 'string',
    default: 'localhost'
  }
]

export default HOSTNAME_OPTION
