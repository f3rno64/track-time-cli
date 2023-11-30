#!/usr/bin/env node

import yArgs from 'yargs'

import log from './log'
import * as C from './color'
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
  .fail((_, err: Error): void => {
    log(`${C.clHighlight('Error:')} ${C.clError(err.message)}`)
    process.exit(1)
  })
  .help()
  .version()
  .recommendCommands()

commands.forEach((def) => {
  y.command(def)
})

y.parse()
