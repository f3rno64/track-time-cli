import formatDuration from 'format-duration'
import humanizeDuration from 'humanize-duration'

// prettier-ignore
const getDurationLangString = (
  duration: number,
  humanize?: boolean
): string => (
  !humanize
    ? formatDuration(duration)
    : humanizeDuration(duration, {
      round: true,
      units: ['y', 'mo', 'w', 'd', 'h', 'm']
    })
)

export default getDurationLangString
