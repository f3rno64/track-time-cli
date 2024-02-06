import handler from './handler'
import { CONFIG } from './const'
import { type YesterdayCommandArgs } from './types'

export { type YesterdayCommandArgs, handler }
export default {
  ...CONFIG,
  handler
}
