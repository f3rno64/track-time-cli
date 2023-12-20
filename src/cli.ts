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
    argv.yargs = y
  })
  .fail((_, err: Error): void => {
    log(`${C.clHighlight('Error:')} ${C.clError(err.message)}`)

    process.exit(1)
  })
  .help(false)
  .version()
  .recommendCommands()
  .example(
    'tt in --at "20 minutes ago" fixing a bug',
    'Check in at a custom time'
  )
  .example('tt out --at "5 minutes ago"', 'Check out at a custom time')
  .example('tt list --today --all', 'View all entries from today')
  .example('tt b', 'Show a breakdown of your activity')
  .example('tt today --all', 'View activity for the current day')

commands.forEach((def) => {
  y.command(def as unknown as CommandModule)
})

y.parse()
