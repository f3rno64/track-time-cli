import { type YArgsOptionDefinition } from '../types'

const ENTRY_OPTION: YArgsOptionDefinition = [
  'entry',
  {
    describe: 'ID of entry to edit',
    alias: 'e',
    type: 'number'
  }
]

export default ENTRY_OPTION
