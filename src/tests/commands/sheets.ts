/* eslint-env mocha */

import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'

import getTestDB from '../get_test_db'
import { handler } from '../../commands/sheets'

chai.use(chaiAsPromised)

const db = getTestDB()

describe('commands:sheets:handler', () => {
  beforeEach(async () => {
    await db.load()
  })

  afterEach(async () => {
    await db.delete()
  })

  it('throws an error if no sheets exist', () => {
    if (db.db == null) {
      throw new Error('Test DB is null')
    }

    db.db.sheets = []

    const p = handler({ db })

    expect(p).to.be.rejectedWith('No time sheets exist')
  })
})
