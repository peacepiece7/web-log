export const getAPI = async (url: string) => {
  const res = await fetch(url, {
    method: 'GET',
    cache: 'force-cache',
  })
  return await res.json()
}

export const postAPI = async (url: string, body: any) => {
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    cache: 'force-cache',
  })
  const data = await res.json()
  return data
}
