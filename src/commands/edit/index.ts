import { type EditCommandArgs } from './types'
import { CONFIG } from './const'
import handler from './handler'

export { type EditCommandArgs, handler }
export default {
  ...CONFIG,
  handler
}
