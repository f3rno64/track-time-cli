/* eslint-env mocha */

import { type Argv } from 'yargs'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'

import getTestDB from '../get_test_db'
import { type SheetsCommandArgs, handler } from '../../commands/sheets'

chai.use(chaiAsPromised)

const db = getTestDB()
const getArgs = (overrides?: Record<string, unknown>): SheetsCommandArgs => ({
  db,
  yargs: {} as Argv,
  ...(overrides ?? {})
})

describe('commands:sheets:handler', function () {
  this.timeout(10 * 1000)

  beforeEach(async function () {
    await db.load()
  })

  afterEach(async function () {
    await db.delete()
  })

  it('throws an error if no sheets exist', function () {
    if (db.db == null) {
      throw new Error('Test DB is null')
    }

    db.db.sheets = []

    const p = handler(getArgs())

    expect(p).to.be.rejectedWith('No time sheets exist')
  })
})
