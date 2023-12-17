import express from 'express'
import open from 'open'
import path from 'path'
import sass from 'node-sass'
import handlebars from 'handlebars'
import { promises as fs } from 'fs'
import manifest from '../../../package.json'

import * as U from '../../utils'
import { type ServeCommandArgs } from './types'

handlebars.registerHelper('date', (date: Date): string => date.toDateString())

const { version } = manifest
const l = U.getLogger('serve')

// TODO: Extract
const getTemplatePath = (templateName: string): string =>
  path.join(__dirname, '../../templates', templateName)

// TODO: Extract
const loadTemplate = async (
  templateName: string
): Promise<HandlebarsTemplateDelegate> => {
  const templatePath = getTemplatePath(templateName)
  const templateContent = await fs.readFile(templatePath, 'utf-8')

  return handlebars.compile(templateContent.toString())
}

// TODO: Extract
const renderStylesheet = async (name: string): Promise<string> => {
  const stylesheetPath = path.join(__dirname, `../../styles/${name}.scss`)
  const stylesheetRaw = await fs.readFile(stylesheetPath, 'utf-8')

  return sass.renderSync({ data: stylesheetRaw }).css.toString()
}

const handler = async (args: ServeCommandArgs) => {
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

export default handler
