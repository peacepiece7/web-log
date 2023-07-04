import { Suspense } from 'react'
import { LogsResponse, ThumbnailsResponse } from '@/type'
import Image from 'next/image'

import PagenatedItems from '@/components/PagenatedItems'

export default async function Home() {
  const logsResponse = await fetch(
    `${
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : `https://${process.env.VERCEL_URL}`
    }/api/get/logs`,
  )
  const logsData = await logsResponse.json()
  const logs = logsData.logs as LogsResponse

  const thumbsResponse = await fetch(
    `${
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : `https://${process.env.VERCEL_URL}`
    }/api/get/thumbnails`,
  )
  const thumbsData = await thumbsResponse.json()
  const thumbnails = thumbsData.thumbnails as ThumbnailsResponse

  return (
    <main className='relative overflow-hidden'>
      <div className='max-w-7xl inset-0 m-auto pl-5 pr-5'>
        <div className='flex mt-24'>
          <Image
            className='rounded-[75px] border-[1px] border-[rgba(255,255,255,0.1)]'
            src='https://avatars.githubusercontent.com/u/73880776?s=400&u=1ce40dd704a71a9f5ce3f80cbf19092032f2df14&v=4'
            alt='profile'
            width={150}
            height={150}
          />
          <div className='pl-24'>
            <h1 className='pb-4'>TaeUk Jung</h1>
            <p className='pb-4'>FRONT-END DEVELOPER</p>

            <a
              className='flex mt-4 hover:text-red-500 transition-all'
              href='https://github.com/peacepiece7'
              target='_blank'
            >
              <p className='m-0 pr-2'>Github</p>
              {/* prettier-ignore */}
              <svg width='1rem' height='1rem' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'><g fill='#000000' fillRule='evenodd'><path d='m9.19988714 48.7570842c-1.64744263-2.5835943-2.3990164-5.474585-2.8310164-8.4680413-.53114754-3.6530779-.60550819-7.2951774.56921312-10.8686616.61613115-1.8754845 1.56245902-3.5423785 2.7752459-5.0546595.34701644-.4336486.43465574-.7959373.34790164-1.4034113-.1522623-1.066739-.07170492-2.1801364 0-3.2679174.1965246-2.9943712.8161967-5.8999999 1.8572459-8.7049928.0601967-.1619321.1416393-.3165452.2399016-.5315398 3.4586558.4418824 6.4596394 1.9367808 9.3738689 3.6475887 1.1162951.6541324 2.1697377 1.4226236 3.2807213 2.0877345.3054098.1820592.7329836.296418 1.0738033.2406109 4.4943934-.7337261 8.9825901-.763002 13.4743279.021042.2682295.0457435.6081639-.0329353.846295-.1756551 2.0962623-1.2588618 4.1535738-2.5899984 6.2701968-3.8122654 1.9953442-1.151822 4.2323606-1.5406419 6.4906229-2.0246084.9135738 2.1224996 1.4898689 4.3117847 1.7943934 6.5577917.2416722 1.780338.500164 3.6128236.3301968 5.3794386-.122164 1.2625213.3417049 1.9971623.968459 2.8598852 2.0236721 2.7857806 2.9257377 5.9750192 3.0363934 9.4277405.104459 3.2752364-.27 6.4882615-1.2039344 9.6244376-1.6040656 5.390417-4.975082 9.0480693-10.0687869 11.0415721-3.2860328 1.2863079-6.7145901 1.6659792-10.1785574 1.6595751-4.852918-.0091487-9.7261967.1024655-14.5534426-.3092263-5.67-.4830516-10.5963934-2.7555899-13.89304916-7.926438zm6.78718036-14.7318675c-2.4866558 2.2845987-3.1302295 5.2502358-2.8283607 8.45193.4798033 5.0892467 2.3175738 7.8622395 7.2784918 9.2659201 3.9481967 1.1178797 7.9911148 1.3023841 12.0499672 1.2435959 1.3137049 0 2.6274099.0343685 3.9393443-.0072355 3.1806885-.1012965 6.3162295-.5517043 9.3393443-1.5899939 2.7115081-.9306619 4.6997704-2.6726006 5.6434426-5.5414633.6683606-2.0322619.9286229-4.0970833.6382623-6.2134574-.4443935-3.2396804-3.3187869-7.7148168-8.1-7.6334178-1.7696066.0307507-3.5383279.1401871-5.3079345.1763645-3.0797704.0624059-6.1604262.141996-9.2401967.1284295-2.793836-.0117576-5.5894426-.2432926-8.3797377-.1763645-1.828918.0443172-3.5932131.5734108-5.0326229 1.8956924z'/><ellipse cx='23.554' cy='42' rx='4' ry='5'/><ellipse cx='42.554' cy='42' rx='4' ry='5'/></g></svg>
            </a>
            <a
              className='flex mt-4 hover:text-red-500 transition-all'
              href='mailto:scv7282@naver.com'
            >
              <p className='m-0 pr-2'>Email</p>
              {/* prettier-ignore */}
              <svg fill='#000000'  width='1rem' height='1rem' version='1.1' viewBox='0 0 75.294 75.294'><g><path d='M66.097,12.089h-56.9C4.126,12.089,0,16.215,0,21.286v32.722c0,5.071,4.126,9.197,9.197,9.197h56.9 c5.071,0,9.197-4.126,9.197-9.197V21.287C75.295,16.215,71.169,12.089,66.097,12.089z M61.603,18.089L37.647,33.523L13.691,18.089 H61.603z M66.097,57.206h-56.9C7.434,57.206,6,55.771,6,54.009V21.457l29.796,19.16c0.04,0.025,0.083,0.042,0.124,0.065 c0.043,0.024,0.087,0.047,0.131,0.069c0.231,0.119,0.469,0.215,0.712,0.278c0.025,0.007,0.05,0.01,0.075,0.016 c0.267,0.063,0.537,0.102,0.807,0.102c0.001,0,0.002,0,0.002,0c0.002,0,0.003,0,0.004,0c0.27,0,0.54-0.038,0.807-0.102 c0.025-0.006,0.05-0.009,0.075-0.016c0.243-0.063,0.48-0.159,0.712-0.278c0.044-0.022,0.088-0.045,0.131-0.069 c0.041-0.023,0.084-0.04,0.124-0.065l29.796-19.16v32.551C69.295,55.771,67.86,57.206,66.097,57.206z'/></g></svg>
            </a>
          </div>
        </div>

        <section className='pt-32 pb-32'>
          <h1 className='text-3xl pb-10'>Latest Logs</h1>
          <Suspense fallback={<div>Loading... from app/pages.tsx</div>}>
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
          </Suspense>
        </section>
      </div>
    </main>
  )
}
