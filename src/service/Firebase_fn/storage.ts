import { cache } from 'react'
import { init } from './config'

import {
  getStorage,
  ref,
  UploadResult,
  deleteObject,
  uploadString,
  getBytes,
} from 'firebase/storage'

export type ContentData = {
  storagePath: string
  content: string
}

const storage = getStorage(init())

export const getContentData = cache(async (_ref?: string) => {
  try {
    if (!_ref) {
      console.warn('ref is not defined')
      return ''
    }
    const storageRef = ref(storage, _ref)
    // * 글자가 짤린다면 maxDownloadSizeBytes를 확인해봅시다.
    const arrayBuffer = await getBytes(storageRef, 1200000)
    const textDecoder = new TextDecoder('utf-8')
    return textDecoder.decode(arrayBuffer)
  } catch (err) {
    console.error(err)
    return ''
  }
})

export const uploadContentData = cache(
  async (storagePath: string, content: string): Promise<UploadResult | void> => {
    const mountainsRef = ref(storage, storagePath)
    return await uploadString(mountainsRef, content)
  },
)

export const deleteContentData = cache(async (storagePath: string) => {
  await deleteObject(ref(storage, storagePath))
})
