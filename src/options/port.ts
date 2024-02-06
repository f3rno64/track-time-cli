import { type YArgsOptionDefinition } from '../types'

const PORT_OPTION: YArgsOptionDefinition = [
  'port',
  {
    default: '7777',
    describe: 'Port to run the server on',
    type: 'number'
  }
]

export default PORT_OPTION
