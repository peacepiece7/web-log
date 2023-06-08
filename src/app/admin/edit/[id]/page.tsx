import FirebaseCollection from '@/service/Firebase/collection'
import { FirebaseStorage } from '@/service/Firebase/storage'
import { Log, Logs } from '@/type'

import EditForm from '@/components/EditForm'

type Props = {
  params: {
    id: string
  }
}
export default async function EditPost({ params }: Props) {
  const db = new FirebaseCollection()
  const logs = await db.getDocs<Logs>('logs')
  const log = logs.find((log) => log.id === params.id) as Log

  const storage = new FirebaseStorage()
  const content = await storage.getStreamData(log.storagePath)

  return (
    <div className='max-w-7xl m-auto'>
      <h1 className='mb-20'>Edit Post</h1>
      <EditForm
        log={log}
        content={content as string}
      />
    </div>
  )
}
