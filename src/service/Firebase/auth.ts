'use client'
import dotenv from 'dotenv'
dotenv.config()
import { initializeApp } from 'firebase/app'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth'

// 신규 사용자
// createUserWithEmailAndPassword(auth, 'foo', 'bar').then((userCredential) => {
//   const user = userCredential.user
//   console.log(user)
// })

// // 기존 사용자 로그인

// signInWithEmailAndPassword(auth, 'foo', 'bar').then((userCredential) => {})

export class FirebaseAuth {
  private auth
  constructor() {
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
    this.auth = getAuth(init)
  }
  async signIn(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password)
  }
}
