import { Signale } from 'signale'

import manifest from '../../package.json'

const DEFAULT_SCOPE = 'log'
const { name: NAME } = manifest

const getLogger = (scope: string = DEFAULT_SCOPE): Signale =>
  new Signale({ scope: `${NAME}:${scope}` })

export default getLogger
