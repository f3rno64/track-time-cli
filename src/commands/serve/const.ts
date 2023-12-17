import * as O from '../../options'

export const CONFIG = {
  command: 'serve',
  describe: 'Start a server for the UI',
  aliases: ['ui'],
  builder: O.setup.bind(null, [O.PortOption, O.HostnameOption])
}
