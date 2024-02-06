import log from '../../log'
import { type ResumeCommandArgs } from './types'
import { clHighlight, clSheet, clText } from '../../color'

const handler = async (args: ResumeCommandArgs): Promise<void> => {
  const { db, help, yargs } = args

  if (help) {
    yargs.showHelp()
    process.exit(0)
  }

  const sheet = db.getActiveSheet()
  const entry = db.getMostRecentlyActiveSheetEntry(sheet)
  const { description, end, id } = entry
  const { name } = sheet

  if (end === null) {
    throw new Error(
      `Sheet ${name} already has an active entry (${id}: ${description})`
    )
  }

  await db.addActiveSheetEntry(sheet, description)

  log(`${clSheet(`${name}:`)} ${clText('resumed')} ${clHighlight(description)}`)
}

export default handler
