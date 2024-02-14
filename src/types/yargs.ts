import DB from '../db'

export interface YArgsDynamicOptionArgs {
  readonly db: DB
}

export type YArgsOptionDefinition = [string, Record<string, string | string[]>]
export type YArgsDynamicOptionDefinition = (
  args: YArgsDynamicOptionArgs
) => Promise<YArgsOptionDefinition>
