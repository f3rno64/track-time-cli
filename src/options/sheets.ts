import DB from '../db'
import { type YArgsDynamicOptionDefinition } from '../types'

interface SheetsOptionArgs {
  db: DB
}

const SHEETS_OPTION: YArgsDynamicOptionDefinition = async (
  args: SheetsOptionArgs
): Promise<[string, Record<string, string | string[]>]> => {
  const { db } = args
  const sheets = db.getAllSheets()
  const sheetNames = sheets.map(({ name }) => name)

  return [
    'sheets',
    {
      describe: 'Show results for the specified sheets',
      choices: sheetNames,
      type: 'array'
    }
  ]
}

export default SHEETS_OPTION
