import { type YArgsOptionDefinition } from '../types'

const SHEET_OPTION: YArgsOptionDefinition = [
  'sheet',
  {
    describe: 'Name of time sheet to edit',
    alias: 's',
    type: 'string'
  }
]

export default SHEET_OPTION
