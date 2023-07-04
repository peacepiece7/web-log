import { getContentDataCache } from './../../../../service/Firebase_fn/storage'
import { NextResponse } from 'next/server'

export type GETContentRequest = {
  ref: string
}

export async function POST(request: Request) {
  try {
    const params = (await request.json()) as GETContentRequest
    const content = await getContentDataCache(params.ref)
    return NextResponse.json(content)
  } catch (error) {
    console.error(error)
    return NextResponse.json('error')
  }
}
