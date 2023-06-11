import FirebaseCollection from '@/service/Firebase/collection'
import { LogDocument, LogResponse } from '@/type'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const log = (await request.json()) as LogResponse
    console.log('Edit log : ', log)
    const db = new FirebaseCollection()
    const logId = log.id
    const { id, ...logData } = log

    const response = await db.setDoc<LogDocument>('logs', logId, logData)
    return NextResponse.json({ state: 'success', response })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ state: 'failure', error })
  }
}

export async function GET() {
  return NextResponse.json({ state: 'success' })
}
