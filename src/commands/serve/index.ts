import { type ServeCommandArgs } from './types'
import { CONFIG } from './const'
import handler from './handler'

export { type ServeCommandArgs, handler }
export default {
  ...CONFIG,
  handler
}
