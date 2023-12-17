import { type BreakdownCommandArgs } from './types'
import { CONFIG } from './const'
import handler from './handler'

export { type BreakdownCommandArgs, handler }
export default {
  ...CONFIG,
  handler
}
