'use client'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'
import 'swiper/css/a11y'

import { TagsResponse, ThumbnailsResponse } from '@/type'

type Props = {
  tags: TagsResponse
  thumbnails: ThumbnailsResponse
}

export default function CategoryList({ tags, thumbnails }: Props) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={0}
      slidesPerView={7}
      navigation
      scrollbar={{ draggable: true }}
    >
      {tags.map((tag) => {
        const thumb = thumbnails.find((thumb) => tag.thumbnailId === thumb.id)
        return (
          <SwiperSlide key={tag.id}>
            <div
              className='w-[100px] h-[100px] flex justify-center items-center rounded-md overflow-hidden'
              dangerouslySetInnerHTML={{ __html: thumb?.source ? thumb.source : '' }}
            ></div>
            <p className='w-[100px] text-center'>{tag.name}</p>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}

// <ul className='flex text-center pl-0 pr-5 overflow-x-scroll'>
