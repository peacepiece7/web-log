export type CategoryData = {
  categories: Categories[]
}
type Categories = {
  id: string
  name: string
  thumbnail: string
}

export type LogData = {
  webLog: WebLog[]
}
type WebLog = {
  id: string
  title: string
  categories: string[]
  createdAt: string
  lastModifiedAt: string
  thumbnail: string
  contentID: string
}

export type ContentData = {
  [key: string]: Contents
}
type Contents = {
  title: string
  content: string
}
