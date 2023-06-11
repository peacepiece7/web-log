import FirebaseCollection from '@/service/Firebase/collection'
import { Logs } from '@/type'
import Link from 'next/link'

export default async function Posts() {
  const db = new FirebaseCollection()
  const logs = await db.getDocs<Logs>('logs')

  return (
    <div>
      <h1>Logs</h1>
      {logs.map((log) => {
        return (
          <div
            className='mt-4'
            key={log.id}
          >
            <Link href={`/admin/logs/edit/${log.id}`}>{log.title}</Link>
          </div>
        )
      })}
    </div>
  )
}
