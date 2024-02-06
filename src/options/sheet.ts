import { type YArgsOptionDefinition } from '../types'

const SHEET_OPTION: YArgsOptionDefinition = [
  'sheet',
  {
    alias: 's',
    describe: 'Name of time sheet to edit',
    type: 'string'
  }
]

export default SHEET_OPTION
