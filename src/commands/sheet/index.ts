import handler from './handler'
import { CONFIG } from './const'
import { type SheetCommandArgs } from './types'

export { type SheetCommandArgs, handler }
export default {
  ...CONFIG,
  handler
}
