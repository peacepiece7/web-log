import { init } from './config'

import {
  CollectionReference,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  DocumentData,
  collection,
  getDocs,
  getFirestore,
  deleteField,
  query,
  where,
  WhereFilterOp,
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
      // console.log(doc.id, id)
      if (doc.id === id) return true
      return false
    })
    if (!doc) return {} as T
    return { id: doc.id, ...doc.data() } as T
  }
  async getDoc<T>(
    _collection: string,
    fildPath: string,
    filterOp: WhereFilterOp,
    value: unknown,
  ): Promise<T> {
    const q = query(collection(this.db, _collection), where(fildPath, filterOp, value))
    const querySnapshot = await getDocs(q)
    const docs = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() }
    })
    return docs as T
  }
  async addDoc<T extends object>(_collection: string, fields: T) {
    const docRef = await addDoc(collection(this.db, _collection), fields)
    return docRef
  }
  /**
   * @description merge : true일 경우 빈 문자열로 데이터가 초기화 되는 현상을 막고, 부분 업데이트 됩니다. default : true 입니다.
   *
   * merge : false일 경우 주어진 데이터 그대로 필드가 덮어 씌워집니다.
   */
  async setDoc<T extends object>(
    _collection: string,
    params: {
      pathSegments?: string[]
      fields: T
    },
  ) {
    params.pathSegments === undefined && (params.pathSegments = [])
    const docRef = await setDoc(
      doc(collection(this.db, _collection), ...params.pathSegments),
      params.fields,
    )
    return docRef
  }
  async delectDoc(_collection: string, pathSegments: string[]) {
    const docRef = await updateDoc(doc(collection(this.db, _collection), ...pathSegments), {
      capital: deleteField(),
    })
    return docRef
  }
}
