const { NODE_ENV } = process.env

const log = (str: string): void => {
  if (NODE_ENV === 'test') {
    return
  }

  // eslint-disable-next-line no-console
  console.log(str)
}

export default log
