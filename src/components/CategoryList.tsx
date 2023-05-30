import Image from 'next/image'
import { CategoryData } from '@/type'

type Props = {
  categories: CategoryData['categories']
}
export default function CategoryList({ categories }: Props) {
  // todo : Image h-100%말고 더 좋은 방법 찾아보기, height : 100px될 때 까지 width 늘리고 중심만 보이도록 하면 좋을 듯 합니다.
  return (
    <ul className='flex text-center'>
      {categories.map((category) => {
        return (
          <li
            key={category.id}
            className='p-5'
          >
            <div className='w-[100px] h-[100px] flex justify-center items-center rounded-md overflow-hidden'>
              <Image
                src={`/${category.thumbnail}`}
                alt={category.name + ' thumbnail'}
                width={100}
                height={100}
                className='h-[100%]'
              />
            </div>
            <p>{category.name}</p>
          </li>
        )
      })}
    </ul>
  )
}
