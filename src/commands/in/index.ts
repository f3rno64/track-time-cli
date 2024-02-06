import handler from './handler'
import { CONFIG } from './const'
import { type InCommandArgs } from './types'

export { type InCommandArgs, handler }
export default {
  ...CONFIG,
  handler
}
