import { promises as fs } from 'fs'

const ensureDirExists = async (dirPath: string): Promise<void> => {
  try {
    await fs.access(dirPath)
  } catch (err: unknown) {
    await fs.mkdir(dirPath)
  }
}

export default ensureDirExists
