import { useSearchParams } from 'next/navigation'
import { getContentDataCache } from './../../../../service/Firebase_fn/storage'
import { NextResponse } from 'next/server'

export type GETContentRequest = {
  ref: string
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const params = new URLSearchParams(url.searchParams)
    const id = params.get('productId')
    const content = await getContentDataCache(id!)
    return NextResponse.json(content)
  } catch (error) {
    console.error(error)
    return NextResponse.json('error')
  }
}
