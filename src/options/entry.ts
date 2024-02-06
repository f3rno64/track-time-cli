import { type YArgsOptionDefinition } from '../types'

const ENTRY_OPTION: YArgsOptionDefinition = [
  'entry',
  {
    alias: 'e',
    describe: 'ID of entry to edit',
    type: 'number'
  }
]

export default ENTRY_OPTION
