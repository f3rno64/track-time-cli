import handler from './handler'
import { CONFIG } from './const'
import { type ResumeCommandArgs } from './types'

export { type ResumeCommandArgs, handler }
export default {
  ...CONFIG,
  handler
}
