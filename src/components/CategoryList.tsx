import { TagsResponse, ThumbnailsResponse } from '@/type'

type Props = {
  tags: TagsResponse
  thumbnails: ThumbnailsResponse
}

export default function CategoryList({ tags, thumbnails }: Props) {
  // todo : Image h-100%말고 더 좋은 방법 찾아보기, height : 100px될 때 까지 width 늘리고 중심만 보이도록 하면 좋을 듯 합니다.
  return (
    <ul className='flex text-center pl-0 pr-5'>
      {tags.map((tag) => {
        const thumb = thumbnails.find((thumb) => tag.thumbnailId === thumb.id)
        return (
          <li
            key={tag.id}
            className='pl-12'
          >
            <div
              className='w-[100px] h-[100px] flex justify-center items-center rounded-md overflow-hidden'
              dangerouslySetInnerHTML={{ __html: thumb?.source ? thumb.source : '' }}
            />
            <p>{tag.name}</p>
          </li>
        )
      })}
    </ul>
  )
}
