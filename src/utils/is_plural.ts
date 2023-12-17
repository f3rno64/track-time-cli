const isPlural = (input: string): boolean => {
  return (
    input.charAt(input.length - 1) === 's' ||
    input.substring(input.length - 3) === 'ies'
  )
}

export default isPlural
