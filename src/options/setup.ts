import { type Argv } from 'yargs'

const setupOptions = (
  options: Array<[string, Record<string, string>]>,
  yargs: Argv
) => {
  options.forEach((option: [string, Record<string, string>]) => {
    yargs.option(...option)
  })
}

export default setupOptions
