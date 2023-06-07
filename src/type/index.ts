export type Tags = Tag[]

type Tag = {
  id: string
  name: string
  thumbnailId: string
  thumbnailSource?: string
}
export type Logs = Log[]

export type Log = {
  id: string
  title: string
  tags: string[]
  createdAt: string
  lastModifiedAt: string
  thumbnailId: string
  thumbnailSource?: string
  contentId: string
}

export type Thumbnails = Thumbnail[]
type Thumbnail = {
  id: string
  name: string
  source: string
}

export type Contents = Content[]

export type Content = {
  id: string
  logId: string
  tagId: string
  content: string
}
