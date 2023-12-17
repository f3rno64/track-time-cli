import { type NowCommandArgs } from './types'
import { CONFIG } from './const'
import handler from './handler'

export { type NowCommandArgs, handler }
export default {
  ...CONFIG,
  handler
}
