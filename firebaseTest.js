import { initializeApp } from 'firebase/app'
import dotenv from 'dotenv'
import { collection, getDocs, getFirestore, addDoc } from 'firebase/firestore/lite'
// import { CollectionReference, doc, setDoc, addDoc } from 'firebase/firestore'

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

const init = initializeApp(firebaseConfig)

const db = getFirestore(init)
const logCol = collection(db, 'test')

const snapshot = await getDocs(logCol)
const getData = snapshot.docs.map((doc) => doc.data())
console.log(getData)

// const db2 = getFirestore(isnit)

const docRef2 = await addDoc(collection(db, 'test'), {
  name: 'bar',
})

// const docRef = await addDoc(logCol, {
//   categories: ['TypeScript', 'NextJS'],
//   createdAt: '2021-05-01',
//   fileName: 'C123',
//   lastModifedAt: '2021-05-02',
//   thumbnail: 'NextJS_logo.png',
//   title: 'NextJS Tutorial with Typescript',
// })

// console.log(docRef2)

// const res = await setDoc(doc(db2, 'log'), {
//   id: '123123',
//   title: 'foo',
//   categories: ['bar'],
//   lastModifedAt: '2021-10-10',
//   thumbnail: 'JavaScript_logo.svg',
//   fileName: 'C123',
//   createdAt: '2022-10-10',
// })

// console.log('setdoc res : ', res)
