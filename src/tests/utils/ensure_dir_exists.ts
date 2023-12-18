/* eslint-env mocha */

import os from 'os'
import path from 'path'
import { promises as fs } from 'fs'

import { ensureDirExists } from '../../utils'

const TEMP_DIR = os.tmpdir()

describe('utils:ensure_dir_exists', () => {
  it('should create a directory if it does not exist', (done) => {
    const dirName = 'test-dir'
    const dirPath = path.join(TEMP_DIR, dirName)

    ensureDirExists(dirPath)
      .then(async () => {
        try {
          await fs.access(dirPath)
          done()
        } catch (err) {
          done(err)
        }
      })
      .catch((err) => {
        done(err)
      })
  })
})
