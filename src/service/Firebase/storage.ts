import { init } from './config'

import {
  getStorage,
  ref,
  getStream,
  uploadBytes,
  UploadResult,
  deleteObject,
} from 'firebase/storage'
import FirebaseCollection from './collection'

export type ContentData = {
  storagePath: string
  content: string
}

export class FirebaseStorage {
  private storage
  constructor() {
    this.storage = getStorage(init)
  }
  async getStreamData(_ref?: string): Promise<string> {
    try {
      if (!_ref) {
        console.warn('ref is not defined')
        return ''
      }
      const storageRef = ref(this.storage, _ref)
      const stream = getStream(storageRef)
      const data = await new Promise((res) => {
        stream.on('data', (data) => {
          res(data.toString('utf-8'))
        })
      })
      return data as string
    } catch (error) {
      console.error(error)
      return ''
    }
  }
  async uploadContentData(storagePath: string, content: string): Promise<UploadResult | void> {
    const mountainsRef = ref(this.storage, storagePath)
    const buf = Buffer.from(content, 'utf8')
    const snapshot = await uploadBytes(mountainsRef, buf)
    return snapshot
  }

  async deleteContentData(storagePath: string) {
    await deleteObject(ref(this.storage, storagePath))
  }
}
