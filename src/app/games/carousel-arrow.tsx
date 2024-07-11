import arrow from '@/../public/images/arrow.svg'

import Image from 'next/image'

export default function CarouselArrow({
  onClick,
  isLeft,
}: {
  onClick: () => void
  isLeft: boolean
}) {
  return (
    <button className="hover:scale-110 active:scale-95 duration-300 drop-shadow-lg drop-shadow-black">
      <Image
        src={arrow}
        alt={`Arrow ${isLeft ? 'left' : 'right'}`}
        className={`h-[40%] max-h-32  ${
          isLeft ? '-scale-x-100' : ''
        } drop-shadow-md drop-shadow-black`}
        onClick={onClick}
      />
    </button>
  )
}
