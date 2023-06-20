import { init } from './config'

import {
  addDoc,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  getFirestore,
  deleteField,
  query,
  where,
  WhereFilterOp,
  DocumentData,
  DocumentReference,
  deleteDoc,
} from 'firebase/firestore'

export default class FirebaseCollection {
  db
  constructor() {
    this.db = getFirestore(init)
  }
  async getDocs<T>(_collection: string): Promise<T> {
    const snapshot = await getDocs(collection(this.db, _collection))
    const docs = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() }
    })
    return docs as T
  }
  async getDocById<T>(_collection: string, id: string): Promise<T> {
    const snapshot = await getDocs(collection(this.db, _collection))
    const doc = snapshot.docs.find((doc) => {
      if (doc.id === id) return true
      return false
    })
    if (!doc) return {} as T
    return { id: doc.id, ...doc.data() } as T
  }
  async getDoc<T>(_collection: string, id: string): Promise<T> {
    const ref = doc(this.db, _collection, id)
    const docSnap = await getDoc(ref)
    return { id: docSnap.id, ...docSnap.data() } as T
  }
  async addDoc<T extends object>(
    _collection: string,
    fields: T,
  ): Promise<DocumentReference<DocumentData>> {
    const docRef = await addDoc(collection(this.db, _collection), fields)
    return docRef
  }
  /**
   * @description merge : true일 경우 빈 문자열로 데이터가 초기화 되는 현상을 막고, 부분 업데이트 됩니다. default : true 입니다.
   *
   * merge : false일 경우 주어진 데이터 그대로 필드가 덮어 씌워집니다.
   */
  async setDoc<T extends object>(_collection: string, id: string, data: T) {
    await setDoc(doc(this.db, _collection, id), data)
  }
  async deleteDoc(_collection: string, id: string) {
    if (!_collection || !id) throw new Error('컬렉션과 아이디가 입력되지 않았습니다.')
    await deleteDoc(doc(this.db, _collection, id)),
      {
        capital: deleteField(),
      }
  }
}
