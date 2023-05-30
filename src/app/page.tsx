import fileData from '../service/getFileData'
import { CategoryData, LogData } from '@/type'
import CategoryList from '../components/CategoryList'
import LatestLogList from '../components/LatestLogList'

export default function Home() {
  const categoryData = fileData.getCategory<CategoryData>()
  const logData = fileData.getLogInformation<LogData>()
  return (
    <main>
      <h1 className='text-3xl'>{"Hi, I'm front-end developer jung tae uk"}</h1>
      <p className='text-xl'>{'This space is the playground that writting my experience'}</p>
      <section>
        <h2 className='text-2xl'>Category</h2>
        {categoryData ? (
          <CategoryList categories={categoryData.categories} />
        ) : (
          <div>not found category data</div>
        )}
      </section>
      <section>
        <h2 className='text-2xl pb-20'>Latest Logs</h2>
        {logData ? <LatestLogList logData={logData} /> : <div>not found log data</div>}
      </section>
    </main>
  )
}
