import { type SheetCommandArgs } from './types'
import handler from './handler'
import { CONFIG } from './const'

export { type SheetCommandArgs, handler }
export default {
  ...CONFIG,
  handler
}
