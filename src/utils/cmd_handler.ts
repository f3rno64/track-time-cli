const cmdHandler = (exec) =>
  async function handler(argv) {
    await exec(argv)
  }

export default cmdHandler
