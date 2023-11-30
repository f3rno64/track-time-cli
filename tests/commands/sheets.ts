/* eslint-env mocha */

import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'

import { deleteDB, initDB } from '../../src/db'
import { handler } from '../../src/commands/sheets'
import { type TimeTrackerDB } from '../../src/types'

chai.use(chaiAsPromised)

let db: TimeTrackerDB = {} as unknown as TimeTrackerDB

describe('commands:sheets:handler', () => {
  beforeEach(async () => {
    db = await initDB()
  })

  afterEach(async () => {
    await deleteDB()
    db = {} as unknown as TimeTrackerDB
  })

  it('throws an error if no sheets exist', () => {
    db.sheets = []

    const p = handler({ db })

    expect(p).to.be.rejectedWith('No time sheets exist')
  })
})
