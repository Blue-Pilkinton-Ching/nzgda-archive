import Link from 'next/link'
import { MouseEvent } from 'react'

export default function Dropdown({
  options,
  className,
  inverted,
  text,
  onClick,
  maxHeight,
  width,
}: {
  options: string[]
  text: string
  className?: string
  inverted?: boolean
  onClick: (option: string) => void
  maxHeight?: number
  width?: number
}) {
  return (
    <>
      <div className={`relative mt-2 pb-2 group/button w-min ${className}`}>
        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className={
            inverted
              ? 'text-nowrap text-black focus:text-mainred border border-white focus:border-mainred group-hover/button:border-mainred group-hover/button:text-mainred hover:text-mainred font-medium rounded-lg peer/button text-sm px-5 py-2.5 text-center justify-center inline-flex items-center'
              : 'text-nowrap text-white bg-mainred focus:ring-4 ring-green-200 peer/button hover:ring-4 group-hover/button:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center'
          }
          type="button"
          style={width ? { width: `${width}px` } : undefined}
        >
          {text}{' '}
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        <div
          id="dropdown"
          className="my-2 inset-x-0 mx-auto absolute z-10 hidden peer-focus/button:block group-hover/button:block hover:block bg-white divide-y divide-gray-100 rounded-lg shadow"
          style={width ? { width: `${width}px` } : undefined}
        >
          <ul
            className={`py-2 text-sm text-mainred shadow-md overflow-y-auto `}
            aria-labelledby="dropdownDefaultButton"
            style={{ maxHeight: `${maxHeight}px` }}
          >
            <li>
              <button
                onClick={() => onClick('All')}
                className="block px-4 py-2 font-semibold hover:bg-neutral-100 *:active:scale-90 w-full"
              >
                <p className="w-min duration-200 text-nowrap overflow-ellipsis">
                  All
                </p>
              </button>
            </li>
            {options.map((option) => (
              <li key={option}>
                <button
                  onClick={() => onClick(option)}
                  className="block px-4 py-2 hover:bg-neutral-100 *:active:scale-90 w-full"
                >
                  <p className="w-min text-nowrap overflow-ellipsis duration-200">
                    {option}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
