import handler from './handler'
import { CONFIG } from './const'
import { type TodayCommandArgs } from './types'

export { type TodayCommandArgs, handler }
export default {
  ...CONFIG,
  handler
}
