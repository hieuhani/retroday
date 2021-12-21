export const getInitialFromEmail = (email: string) => {
  const name = email.includes('@') ? email.split('@')[0] : email
  const segments = name.split('.')
  let output = ''
  if (segments.length === 2)
    output = `${segments[0][0]}${segments[1][0]}`

  else
    output = name.substring(0, 2)

  return output.toUpperCase()
}
