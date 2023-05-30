import { init } from './config'
import { DocumentData, Firestore, collection, getDocs, getFirestore } from 'firebase/firestore/lite'
import { doc, setDoc } from 'firebase/firestore'

export default class FirebaseCollection {
  column
  type: string
  constructor(type: string) {
    this.type = type
    this.column = collection(getFirestore(init), type)
  }

  async getData() {
    const snapshot = await getDocs(this.column)
    return snapshot.docs.map((doc) => doc.data())
  }
  async setData<T>(types: string[], data: T) {
    await setDoc(doc(this.column, ...types), data as DocumentData)
  }

  // async getDataMap<T>(cb: (data: DocumentData) => T | DocumentData) {
  //   const snapshot = await getDocs(this.column)
  //   snapshot.docs.map((doc) => cb(doc.data()))
  // }
}
