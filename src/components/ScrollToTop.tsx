'use client'
import { useScroll } from '@/hooks/useScroll'

export default function ScrollToTop() {
  const [scroll] = useScroll()
  function toTop() {
    window.scrollTo({ top: 0 })
  }
  return (
    <div
      className={`fixed bottom-12 right-12 transition-all ease-in-out drop-shadow-2xl rounded-xl hover:scale-110 bg-white
      ${scroll.y > 300 ? ' opacity-100' : '  opacity-0 invisible'}`}
      onClick={toTop}
    >
      <div className='flex w-[50px] h-[50px] justify-center items-center cursor-pointer'>Top</div>
    </div>
  )
}
