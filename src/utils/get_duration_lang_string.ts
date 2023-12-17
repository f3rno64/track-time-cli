import humanizeDuration from 'humanize-duration'

const getDurationLangString = (duration: number): string =>
  humanizeDuration(duration, {
    round: true,
    units: ['y', 'mo', 'w', 'd', 'h', 'm']
  })

export default getDurationLangString
