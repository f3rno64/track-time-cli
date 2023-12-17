import open from 'open'
import path from 'path'
import sass from 'node-sass'
import express from 'express'
import handlebars from 'handlebars'
import { promises as fs } from 'fs'
import manifest from '../../package.json'

import DB from '../db'
import * as U from '../utils'
import * as O from '../options'

interface ServeCommandArguments {
  db: DB
  port?: number
  hostname?: string
}

handlebars.registerHelper('date', (date: Date): string => date.toDateString())

const { version } = manifest
const COMMAND_CONFIG = {
  command: 'serve',
  describe: 'Start a server for the UI',
  aliases: ['ui'],
  builder: O.setup.bind(null, [O.PortOption, O.HostnameOption])
}

const l = U.getLogger('serve')
const getTemplatePath = (templateName: string): string =>
  path.join(__dirname, '../../templates', templateName)

const loadTemplate = async (
  templateName: string
): Promise<HandlebarsTemplateDelegate> => {
  const templatePath = getTemplatePath(templateName)
  const templateContent = await fs.readFile(templatePath, 'utf-8')

  return handlebars.compile(templateContent.toString())
}

const renderStylesheet = async (name: string): Promise<string> => {
  const stylesheetPath = path.join(__dirname, `../../styles/${name}.scss`)
  const stylesheetRaw = await fs.readFile(stylesheetPath, 'utf-8')

  return sass.renderSync({ data: stylesheetRaw }).css.toString()
}

const handler = async (args: ServeCommandArguments) => {
  const { port, db } = args
  const app = express()
  const sheets = db.getAllSheets()

  const indexCSS = await renderStylesheet('index')
  const resetCSS = await renderStylesheet('reset')
  const css = `${resetCSS}\n${indexCSS}`

  const indexTemplate = await loadTemplate('index.hbs')
  const html = indexTemplate({ css, sheets, version })

  app.get('/', (_, res) => {
    res.send(html)
  })

  app.listen(port, () => {
    l.info(`Listening on port ${port}`)

    open(`http://localhost:${port}`)
  })
}

export { handler }
export default {
  ...COMMAND_CONFIG,
  handler
}
