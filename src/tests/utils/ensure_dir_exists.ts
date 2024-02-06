/* eslint-env mocha */

import { promises as fs } from 'fs'
import os from 'os'
import path from 'path'

import { ensureDirExists } from '../../utils'

const TEMP_DIR = os.tmpdir()

describe('utils:ensure_dir_exists', function () {
  it('should create a directory if it does not exist', async function () {
    const dirName = 'test-dir'
    const dirPath = path.join(TEMP_DIR, dirName)

    await ensureDirExists(dirPath)
    await fs.access(dirPath)
  })
})
