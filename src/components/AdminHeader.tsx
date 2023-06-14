import Link from 'next/link'

export default function AdminHeader() {
  return (
    <header className='flex justify-end h-[100px]'>
      <Link
        prefetch={false}
        className='pr-12'
        href='/admin/logs'
      >
        Logs
      </Link>
      <Link
        prefetch={false}
        className='pr-12'
        href='/admin/logs/add'
      >
        Add Log
      </Link>
      <Link
        prefetch={false}
        className='pr-12'
        href='/admin/tags'
      >
        Tags
      </Link>
      <Link
        prefetch={false}
        className='pr-12'
        href='/admin/tags/add'
      >
        Add Tag
      </Link>
    </header>
  )
}
