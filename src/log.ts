const { NODE_ENV } = process.env

const log = (str: string): void => {
  if (NODE_ENV === 'test') {
    return
  }

  console.log(str)
}

export default log
