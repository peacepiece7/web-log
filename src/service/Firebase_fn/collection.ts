import 'server-only'
// 랜더링 사이클 내에서만 캐싱
import { cache } from 'react'
import { init } from './config'

import {
  addDoc,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  getFirestore,
  deleteDoc,
} from 'firebase/firestore'

// ! db가 전역 선언 되었을 떄 몇번 리 렌더링 되는지 체크하고,
// ! memo 또는 cache를 사용하여 최적화를 진행해야 합니다.
const db = getFirestore(init)

// export const getDocsCache = async <T extends object>(_collection: string) => {
//   console.log('GET DOCS CACHE가 호출되었습니다.')
//   const snapshot = await getDocs(collection(db, _collection))
//   const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
//   return docs as T
// }

export const getDocsCache = cache(async <T extends object>(_collection: string) => {
  console.log(_collection + 'GET DOCS CACHE가 호출되었습니다.')
  debugger
  const snapshot = await getDocs(collection(db, _collection))
  const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  const obj: {
    [key: string]: T
  } = {}
  obj[`${_collection}`] = docs as T
  return obj
})

export const getDocCache = cache(async <T extends object>(_collection: string, id: string) => {
  console.log('GET DOC CACHE가 호출되었습니다.')
  const ref = doc(db, _collection, id)
  const docSnap = await getDoc(ref)
  return { id: docSnap.id, ...docSnap.data() } as T
})

export const addDocCache = cache(async <T extends object>(_collection: string, fields: T) => {
  const docRef = await addDoc(collection(db, _collection), fields)
  return docRef
})

export const setDocCache = cache(
  async <T extends object>(_collection: string, id: string, data: T) => {
    await setDoc(doc(db, _collection, id), data)
  },
)

export const deleteDocCache = cache(async (_collection: string, id: string) => {
  if (!_collection || !id) throw new Error('컬렉션과 아이디가 입력되지 않았습니다.')
  await deleteDoc(doc(db, _collection, id))
})
