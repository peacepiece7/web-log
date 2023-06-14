import { LogDocument, LogResponse } from '@/type'
import { NextResponse } from 'next/server'
import FirebaseCollection from '@/service/Firebase/collection'

// * Update Log API
export async function POST(request: Request) {
  try {
    const log = (await request.json()) as LogResponse
    const db = new FirebaseCollection()

    const { id, ...logData } = log
    const response = await db.setDoc<LogDocument>('logs', id, logData)

    return NextResponse.json({ state: 'success', response })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ state: 'failure', error })
  }
}
