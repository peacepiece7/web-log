import { Tags } from '@/type'

type Props = {
  tags: Tags
}

export default function CategoryList({ tags }: Props) {
  // todo : Image h-100%말고 더 좋은 방법 찾아보기, height : 100px될 때 까지 width 늘리고 중심만 보이도록 하면 좋을 듯 합니다.
  return (
    <ul className='flex text-center pl-0 pr-5'>
      {tags.map((tag) => {
        return (
          <li
            key={tag.id}
            className='pl-12'
          >
            <div
              className='w-[100px] h-[100px] flex justify-center items-center rounded-md overflow-hidden'
              dangerouslySetInnerHTML={
                tag.thumbnailSource ? { __html: tag.thumbnailSource } : { __html: '' }
              }
            />
            <p>{tag.name}</p>
          </li>
        )
      })}
    </ul>
  )
}
