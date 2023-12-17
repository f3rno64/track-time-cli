import { type SheetsCommandArgs } from './types'
import { CONFIG } from './const'
import handler from './handler'

export { type SheetsCommandArgs, handler }
export default {
  ...CONFIG,
  handler
}
