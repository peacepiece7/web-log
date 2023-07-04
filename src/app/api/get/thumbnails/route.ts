import { LogDocument } from '@/type'
import { NextResponse } from 'next/server'

import { getDocsCache } from '@/service/Firebase_fn/collection'

export async function GET() {
  try {
    const thumbnails = await getDocsCache<LogDocument>('thumbnails')
    return NextResponse.json(thumbnails)
  } catch (error) {
    console.error(error)
    return { logs: [] }
  }
}
