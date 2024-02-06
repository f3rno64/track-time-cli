import handler from './handler'
import { CONFIG } from './const'
import { type SheetsCommandArgs } from './types'

export { type SheetsCommandArgs, handler }
export default {
  ...CONFIG,
  handler
}
