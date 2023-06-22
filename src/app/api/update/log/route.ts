import { LogDocument, LogResponse } from '@/type'
import { NextResponse } from 'next/server'
import { setDocCache } from '@/service/Firebase_fn/collection'

// * Update Log API
export async function POST(request: Request) {
  try {
    const log = (await request.json()) as LogResponse

    const { id, ...logData } = log
    const response = await setDocCache<LogDocument>('logs', id, logData)

    return NextResponse.json({ state: 'success', response })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ state: 'failure', error })
  }
}
