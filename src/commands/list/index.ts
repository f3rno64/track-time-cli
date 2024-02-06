import handler from './handler'
import { CONFIG } from './const'
import { type ListCommandArgs } from './types'

export { type ListCommandArgs, handler }
export default {
  ...CONFIG,
  handler
}
