import { type OutCommandArgs } from './types'
import { CONFIG } from './const'
import handler from './handler'

export { type OutCommandArgs, handler }
export default {
  ...CONFIG,
  handler
}
