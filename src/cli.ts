#!/usr/bin/env node

import yArgs from 'yargs'
import commands from './commands'
import { loadDB, initDB, dbExists } from './db'

const y = yArgs
  .scriptName('track-time-cli')
  .middleware(async (argv) => {
    const doesDBExist = await dbExists()

    if (!doesDBExist) {
      await initDB()
    }

    argv.db = await loadDB()
  })
  .showHelpOnFail(false, 'Specify --help for available options')
  .help()
  .version()
  .recommendCommands()

commands.forEach((def) => {
  y.command(def)
})

y.parse()
