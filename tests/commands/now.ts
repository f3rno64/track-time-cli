/* eslint-env mocha */

import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'

import { deleteDB, initDB } from '../../src/db'
import { handler } from '../../src/commands/now'
import { type TimeTrackerDB } from '../../src/types'

chai.use(chaiAsPromised)

let db: TimeTrackerDB = {} as unknown as TimeTrackerDB

describe('commands:now:handler', () => {
  beforeEach(async () => {
    db = await initDB()
  })

  afterEach(async () => {
    await deleteDB()
    db = {} as unknown as TimeTrackerDB
  })

  it('throws an error if there are no sheets with active entries', () => {
    expect(() => handler({ db })).to.throw('No sheets with active entries')
  })
})
