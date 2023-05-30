import fileData from '../service/getFileData'
import { CategoryData, LogData } from '@/type'
import CategoryList from '../components/CategoryList'
import LatestLogList from '../components/LatestLogList'
import FirebaseCollection from '../../service/Firebase/collection'

export default function Home() {
  const categoryData = fileData.getCategory<CategoryData>()
  const logData = fileData.getLogInformation<LogData>()

  const co = new FirebaseCollection('log')
  
  co.getData().then((data) => {
    console.log(data)
  })

  return (
    <main className='pl-5 pr-5'>
      <h1 className='texft-3xl text-center pt-10'>{`Front end developer jung tae uk`}</h1>
      <p className='text-xl pt-32'>This space is the playground that writting my experience</p>
      <section className='pt-20'>
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
