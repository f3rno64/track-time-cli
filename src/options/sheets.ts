import DB from '../db'
import { type YArgsDynamicOptionDefinition } from '../types'

interface SheetsOptionArgs {
  db: DB
}

const SHEETS_OPTION: YArgsDynamicOptionDefinition = async (
  args: SheetsOptionArgs
  // eslint-disable-next-line @typescript-eslint/require-await
): Promise<[string, Record<string, string | string[]>]> => {
  const { db } = args
  const sheets = db.getAllSheets()
  const sheetNames = sheets.map(({ name }) => name)

  return [
    'sheets',
    {
      choices: sheetNames,
      describe: 'Show results for the specified sheets',
      type: 'array'
    }
  ]
}

export default SHEETS_OPTION
