import log from '../../log'
import { type ResumeCommandArgs } from './types'
import { clTag, clHighlight, clSheet, clText } from '../../color'

const handler = async (args: ResumeCommandArgs): Promise<void> => {
  const { db, help, yargs } = args

  if (help) {
    yargs.showHelp()
    process.exit(0)
  }

  const sheet = db.getActiveSheet()
  const entry = db.getMostRecentlyActiveSheetEntry(sheet)
  const { description, end, tags, id } = entry
  const { name } = sheet
  const tagsUI = (tags ?? []).map(clTag).join(' ')

  if (end === null) {
    throw new Error(
      `Sheet ${name} already has an active entry (${id}: ${description})`
    )
  }

  await db.addActiveSheetEntry({ sheet, description, tags })

  log(
    `${clSheet(`${name}:`)} ${clText('resumed')} ${clHighlight(description)} ${tagsUI}`
  )
}

export default handler
