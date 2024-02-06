import handler from './handler'
import { CONFIG } from './const'
import { type NowCommandArgs } from './types'

export { type NowCommandArgs, handler }
export default {
  ...CONFIG,
  handler
}
