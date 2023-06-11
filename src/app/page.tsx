import CategoryList from '../components/CategoryList'
import LatestLogList from '../components/LatestLogList'
import FirebaseCollection from '../service/Firebase/collection'
import { LogsResponse, TagsResponse, ThumbnailsResponse } from '@/type'

export default async function Home() {
  const db = new FirebaseCollection()
  const tags = await db.getDocs<TagsResponse>('tags')
  const logs = await db.getDocs<LogsResponse>('logs')
  const thumbnails = await db.getDocs<ThumbnailsResponse>('thumbnails')

  return (
    <main className=''>
      <div className='max-w-7xl inset-0 m-auto'>
        <h1 className='text-3xl text-center pt-10'>{`Front end developer jung tae uk`}</h1>
        <p className='text-xl text-center pt-32'>
          This space is the playground that writting my experience
        </p>
        <p className='text-xl text-center '>안녕하세요. 한글 테스트용 글자입니다.</p>
        <p className='text-xl text-center '>할 말이 없네요 ㅎㅎ</p>

        <section className='pt-32'>
          <h1 className='text-3xl pb-10 pl-5 pr-5'>Tags</h1>
          {tags ? (
            <CategoryList
              tags={tags}
              thumbnails={thumbnails}
            />
          ) : (
            <div>not found tag data</div>
          )}
        </section>
        <section className='pt-32'>
          <h1 className='text-3xl pb-10 pl-5 pr-5'>Latest Logs</h1>
          {logs ? (
            <LatestLogList
              logs={logs}
              thumbnails={thumbnails}
            />
          ) : (
            <div>not found log data</div>
          )}
        </section>
      </div>
    </main>
  )
}
