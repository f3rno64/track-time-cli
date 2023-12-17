import { type ResumeCommandArgs } from './types'
import { CONFIG } from './const'
import handler from './handler'

export { type ResumeCommandArgs, handler }
export default {
  ...CONFIG,
  handler
}
