import cmdHandler from '../utils/cmd_handler'

const COMMAND_CONFIG = {
  command: 'list',
  describe: 'List all time sheet entries',
  alias: 'la'
}

const handler = (args: any) => {
  console.log(args)
}

export default {
  ...COMMAND_CONFIG,
  handler: cmdHandler(handler)
}
