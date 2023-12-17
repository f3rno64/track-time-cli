import { type YesterdayCommandArgs } from './types'
import { CONFIG } from './const'
import handler from './handler'

export { type YesterdayCommandArgs, handler }
export default {
  ...CONFIG,
  handler
}
