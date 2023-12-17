import { type InCommandArgs } from './types'
import { CONFIG } from './const'
import handler from './handler'

export { type InCommandArgs, handler }
export default {
  ...CONFIG,
  handler
}
