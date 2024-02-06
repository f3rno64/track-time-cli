import handler from './handler'
import { CONFIG } from './const'
import { type OutCommandArgs } from './types'

export { type OutCommandArgs, handler }
export default {
  ...CONFIG,
  handler
}
