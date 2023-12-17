import { type ListCommandArgs } from './types'
import { CONFIG } from './const'
import handler from './handler'

export { type ListCommandArgs, handler }
export default {
  ...CONFIG,
  handler
}
