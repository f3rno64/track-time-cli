import handler from './handler'
import { CONFIG } from './const'
import { type BreakdownCommandArgs } from './types'

export { type BreakdownCommandArgs, handler }
export default {
  ...CONFIG,
  handler
}
