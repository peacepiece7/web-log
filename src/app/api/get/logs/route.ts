import { LogDocument } from '@/type'
import { NextResponse } from 'next/server'

import FirebaseCollection from '@/service/Firebase/collection'

// todo : 트렌잭션 기능 사용하기

export async function GET() {
  try {
    const db = new FirebaseCollection()
    const logs = await db.getDocs<LogDocument>('logs')
    return NextResponse.json({ logs })
  } catch (error) {
    console.error(error)
    return { logs: [] }
  }
}
