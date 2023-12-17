import { type YArgsOptionDefinition } from '../types'

const PORT_OPTION: YArgsOptionDefinition = [
  'port',
  {
    describe: 'Port to run the server on',
    type: 'number',
    default: '7777'
  }
]

export default PORT_OPTION
