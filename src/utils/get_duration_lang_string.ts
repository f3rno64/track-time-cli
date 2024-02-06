import formatDuration from 'format-duration'
import humanizeDuration from 'humanize-duration'

// prettier-ignore
const getDurationLangString = (
  duration: number,
  humanize?: boolean
): string => (
  humanize
    ? humanizeDuration(duration, {
      round: true,
      units: ['y', 'mo', 'w', 'd', 'h', 'm']
    })
    : formatDuration(duration)
)

export default getDurationLangString
