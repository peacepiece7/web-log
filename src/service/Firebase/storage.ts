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

export class FirebaseStorage {
  private storage
  constructor() {
    this.storage = getStorage(init)
  }
  async getContentData(_ref?: string): Promise<string> {
    try {
      if (!_ref) {
        console.warn('ref is not defined')
        return ''
      }
      const storageRef = ref(this.storage, _ref)
      // * 글자가 짤린다면 maxDownloadSizeBytes를 확인해봅시다.
      const abuf = await getBytes(storageRef, 120000)
      const enc = new TextDecoder('utf-8')
      return enc.decode(abuf)
    } catch (error) {
      console.error(error)
      return ''
    }
  }

  async uploadContentData(storagePath: string, content: string): Promise<UploadResult | void> {
    const mountainsRef = ref(this.storage, storagePath)
    return await uploadString(mountainsRef, content)
  }

  async deleteContentData(storagePath: string) {
    await deleteObject(ref(this.storage, storagePath))
  }
}
