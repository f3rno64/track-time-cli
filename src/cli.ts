#!/usr/bin/env node

import yArgs, { type CommandModule } from 'yargs'

import DB from './db'
import log from './log'
import * as C from './color'
import commands from './commands'

const y = yArgs
  .scriptName('track-time-cli')
  .middleware(async (argv) => {
    const db = new DB()

    await db.load()

    argv.db = db
  })
  .fail((_, err: Error): void => {
    log(`${C.clHighlight('Error:')} ${C.clError(err.message)}`)

    process.exit(1)
  })
  .help()
  .version()
  .recommendCommands()

commands.forEach((def) => {
  y.command(def as unknown as CommandModule)
})

y.parse()
