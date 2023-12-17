import isPlural from './is_plural'
import ensureDirExists from './ensure_dir_exists'
import parseVariadicArg from './parse_variadic_arg'
import getDurationLangString from './get_duration_lang_string'
import getTotalSheetDuration from './get_total_sheet_duration'
import getEntryDurationInDay from './get_entry_duration_in_day'
import getPluralizedArrayLength from './get_pluralized_array_length'
import getSheetsWithEntriesSinceDate from './get_sheets_with_entries_since_date'

export * from './dates'

export {
  isPlural,
  ensureDirExists,
  parseVariadicArg,
  getDurationLangString,
  getTotalSheetDuration,
  getEntryDurationInDay,
  getPluralizedArrayLength,
  getSheetsWithEntriesSinceDate
}
