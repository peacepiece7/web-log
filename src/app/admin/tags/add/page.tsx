import TagAddForm from '@/components/TagAddForm'

export default async function AddPost() {
  return (
    <div className='max-w-7xl m-auto'>
      <h1 className='mb-20 pl-8'>Admin Add Tag</h1>
      <TagAddForm />
    </div>
  )
}
