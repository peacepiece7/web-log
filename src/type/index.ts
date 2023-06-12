// * firebase response type
export type TagsResponse = TagResponse[]
export type TagResponse = {
  id: string
  name: string
  thumbnailId: string
}

export type LogsResponse = LogResponse[]
export type LogResponse = {
  id: string
  thumbnailId?: string
  storagePath: string
  lastModifiedAt: string
  tags: string[]
  title: string
  createdAt: string
}

export type ThumbnailsResponse = ThumbnailResponse[]
export type ThumbnailResponse = {
  id: string
  name: string
  source: string
}

// * fireabase document type (request type)
export type LogDocument = {
  createdAt: string
  lastModifiedAt: string
  storagePath: string
  tags: string[]
  thumbnailId?: string
  title: string
}

export type ThumbnailDocument = {
  name: string
  source: string
}
