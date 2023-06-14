import MarkdownIt from 'markdown-it'
// * 랜덤한 Hex Color를 반환합니다.
export const randomBrightColor = (str: string) => {
  var hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  let colour = '#'
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff
    colour += ('00' + value.toString(16)).substr(-2)
  }
  return colour
}

export type Toc = {
  level: string
  text: string
}
// * Markdown에서 Table of Content를 생성합니다.
export const createToc = (markdown: string) => {
  const toc = [] as Toc[]
  const headers = markdown
    .split('\n')
    .filter((line) => line.startsWith('#'))
    .join('\n')
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  })
  const htmlHeaders = md.render(headers)
  htmlHeaders.split('\n').forEach((line: string) => {
    const level = line.match(/<h(\d)>/)
    if (!level) return
    const text = line.replaceAll(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g, '').trim()
    toc.push({ level: level[1], text })
  })
  return toc
}

// * markdown의 header에 id 속성을 부여합니다.
export const addIdToHeader = (html: string) => {
  return html
    .split('\n')
    .map((line) => {
      if (!line.match(/<h(\d)>/)) return line
      const id = line
        .replaceAll(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g, '')
        .replaceAll(' ', '_')
        .trim()
      return line.replace(/<h(\d)>/, `<h$1 id="${id}">`)
    })
    .join('\n')
}
