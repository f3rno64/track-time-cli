import handler from './handler'
import { CONFIG } from './const'
import { type WeekCommandArgs } from './types'

export { type WeekCommandArgs, handler }
export default {
  ...CONFIG,
  handler
}
