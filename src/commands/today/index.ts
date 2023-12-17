import { type TodayCommandArgs } from './types'
import { CONFIG } from './const'
import handler from './handler'

export { type TodayCommandArgs, handler }
export default {
  ...CONFIG,
  handler
}
