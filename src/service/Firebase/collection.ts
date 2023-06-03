import { init } from './config'
import { DocumentData, Firestore, collection, getDocs, getFirestore } from 'firebase/firestore/lite'
import { CollectionReference, doc, setDoc } from 'firebase/firestore'

export default class FirebaseCollection {
  db: CollectionReference<DocumentData>
  type: string
  constructor(type: string) {
    this.type = type
    this.db = collection(getFirestore(init), type)
  }

  async getData() {
    const snapshot = await getDocs(this.db)
    return snapshot.docs.map((doc) => doc.data())
  }
  async setData<T>(types: string[], data: T) {
    await setDoc(doc(this.db, ...types), data as DocumentData)
  }

  // async getDataMap<T>(cb: (data: DocumentData) => T | DocumentData) {
  //   const snapshot = await getDocs(this.column)
  //   snapshot.docs.map((doc) => cb(doc.data()))
  // }
}
