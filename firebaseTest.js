const { initializeApp } = require('firebase/app')
const dotenv = require('dotenv')
const {
  collection,
  getDocs,
  getFirestore,
  setDoc,
  doc,
  addDoc,
  deleteField,
  updateDoc,
  deleteDoc,
} = require('firebase/firestore')

const {
  getStorage,
  ref,
  getStream,
  uploadBytes,
  UploadResult,
  deleteObject,
} = require('firebase/storage')
const fs = require('fs')

dotenv.config()
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}

// async function getData() {
//   const init = initializeApp(firebaseConfig)

//   const db = getFirestore(init)
//   const logs = collection(db, 'logs')

//   const snapshot = await getDocs(logs, 'aLSg9FaCCv1LsVfPxuIR')
//   console.log(snapshot)
//   // * 데이터 가져오기
//   const getData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
//   console.log(getData)
// }

// getData()

// const newData = {
//   title: 'waldo',
//   categories: ['bar'],
//   lastModifedAt: '2021-12-20',
//   thumbnail: 'JavaScript_logo.svg',
//   fileName: 'C123',
//   createdAt: '2022-12-24',
// }

// * 추가
const init = initializeApp(firebaseConfig)
// const db = getFirestore(init)
// const fileData = fs.readFileSync('./markdown_demo.md', 'utf8')

// const data = {
//   id: 'TKLpa1cfBtd97X8MWqnr',
//   title: 'Hello, world!',
//   tags: ['JavaScript', 'NextJS', 'TypeScript'],
//   storagePath: 'markdown/testd09859e0-082d-11ee-9e81-6b1cc8ea817e.md',
//   lastModifiedAt: '2023-06-11',
//   thumbnailId: 'Buw5DCTltxWMh1cJi1Fj',
//   createdAt: '2023-06-11',
// }

// // addDoc(collection(db, 'contents'), data)

// setDoc(doc(db, 'logs', data.id), data)

// * 업데이트
// 문서가 없을 경우 생성됩니다.
// await setDoc(doc(db, 'log', 'oUDHb2Ti2Gj2OUEFdqF0'), newData)
// merge : true일 경우 빈 문자열로 데이터가 초기화 되는 현상을 막고, 부분 업데이트 됩니다. default : true 입니다.
// merge : false일 경우 주어진 데이터 그대로 필드가 덮어 씌워집니다.
// await setDoc(doc(db, 'log', 'oUDHb2Ti2Gj2OUEFdqF1'), { title: 'foo' })

// * 삭제
// const ref = doc(db, 'logs', 'TKLpa1cfBtd97X8MWqnr')
// deleteDoc(ref)
//   .then((res) => {
//     console.log(res)
//   })
//   .catch((error) => {
//     console.error(error)
//   })

const storage = getStorage(init)

const mRef = ref(storage, 'markdown/testest.md')
const content = fs.readFileSync('./markdown_demo.md', 'utf8')

console.log(content)
const buf = Buffer.from(content, 'utf8')
uploadBytes(mRef, buf)
