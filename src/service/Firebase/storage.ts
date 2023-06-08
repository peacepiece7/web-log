// TEST
import { Log } from '@/type'
import { init } from './config'

import { getApp } from 'firebase/app'
import {
  getStorage,
  ref,
  getDownloadURL,
  getBlob,
  getMetadata,
  getStream,
  uploadBytes,
} from 'firebase/storage'

export class FirebaseStorage {
  private storage
  constructor() {
    this.storage = getStorage(init)
  }
  async getStreamData(_ref: string): Promise<unknown> {
    const storageRef = ref(this.storage, _ref)
    const stream = getStream(storageRef)
    const data = await new Promise((res) => {
      stream.on('data', (data) => {
        res(data.toString('utf-8'))
      })
    })
    return data
  }
  uploadData(data: { log: Log; content: string }) {
    const mountainsRef = ref(this.storage, data.log.storagePath)
    const buf = Buffer.from(data.content, 'utf-8')
    uploadBytes(mountainsRef, buf).then((snapshot) => {
      console.log('SNPAESHOT', snapshot)
    })
  }
}

// const storage = getStorage(init)
// const storageRef = ref(storage)

// const mdStorageRef = ref(storage, 'markdown/NextJsMd.md')

// const rootRef = mdStorageRef.root
// const parentRef = mdStorageRef.parent
// storageRef.bucket xxx-yyy-zzz-asd11z.appspot.com

// good!
// https://webruden.tistory.com/946
// const stream = getStream(mdStorageRef)
// stream.on('data', (data) => {
//   console.log(data.toString('utf-8'))
// })

// getMetadata(mdStorageRef).then((metadata) => {
//   console.log(metadata)
// })

// URL가져오기
// getDownloadURL(mdStorageRef)
//   .then((url) => {
//     // https://stackoverflow.com/questions/38284765/get-file-from-external-url-with-fs-readfile
//     console.log(url)
//     https.get(url, (res) => {
//       console.log(res)
//     })
//   })
//   .catch((error) => {
//     console.error(error)
//     // A full list of error codes is available at
//     // https://firebase.google.com/docs/storage/web/handle-errors
//     switch (error.code) {
//       case 'storage/object-not-found':
//         // File doesn't exist
//         break
//       case 'storage/unauthorized':
//         // User doesn't have permission to access the object
//         break
//       case 'storage/canceled':
//         // User canceled the upload
//         break
//       case 'storage/unknown':
//         // Unknown error occurred, inspect the server response
//         break
//     }
//   })

// getBlob(mdStorageRef).then((blob) => {
//   console.log(blob)
// })
