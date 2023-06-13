import PagenatedItems from '@/components/PagenatedItems'
import FirebaseCollection from '../service/Firebase/collection'
import { LogsResponse, ThumbnailsResponse } from '@/type'

// type Props = {
//   logs: LogsResponse
//   thumbnails: ThumbnailsResponse
// }
export default async function Home() {
  const db = new FirebaseCollection()
  const logs = await db.getDocs<LogsResponse>('logs')
  const thumbnails = await db.getDocs<ThumbnailsResponse>('thumbnails')
  return (
    <main className='relative overflow-hidden'>
      <div className='max-w-7xl inset-0 m-auto pl-5 pr-5'>
        <h1 className='text-3xl text-center pt-10'>{`Front end developer jung tae uk`}</h1>
        <p className='text-xl text-center pt-32'>
          This space is the playground that writting my experience
        </p>
        <section className='pt-32 pb-32'>
          <h1 className='text-3xl pb-10'>Latest Logs</h1>
          {logs ? (
            <PagenatedItems
              itemsPerPage={5}
              items={logs}
              thumbs={thumbnails}
              page={0}
            />
          ) : (
            <div>not found log data</div>
          )}
        </section>
      </div>
    </main>
  )
}

// export async function generateStaticParams() {
//   const db = new FirebaseCollection()
//   const logs = await db.getDocs<LogsResponse>('logs')
//   return logs.map((log) => ({ slug: log.id }))
// }
