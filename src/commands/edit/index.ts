import handler from './handler'
import { CONFIG } from './const'
import { type EditCommandArgs } from './types'

export { type EditCommandArgs, handler }
export default {
  ...CONFIG,
  handler
}
