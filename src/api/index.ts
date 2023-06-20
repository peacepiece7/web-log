const url =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://web-log-wheat.vercel.app'

export async function getAPI(path: string) {
  try {
    const response = await fetch(`${url}/${path}`, {
      method: 'GET',
      cache: 'force-cache',
    })
    return await response.json()
  } catch (error) {
    console.error(error)
    return []
  }
}
