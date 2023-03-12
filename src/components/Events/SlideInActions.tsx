import type { FunctionComponent } from 'react'

export const SlideInActions: FunctionComponent<{ test: string }> = () => {
  return (
    <div className="absolute group overflow-hidden inset-0 w-20 h-full">
      <div className="absolute w-full h-full transform duration-500 inset-x-full group-hover:-inset-x-10">
        <div className="absolute w-full flex place-content-center">
          <p>test</p>
        </div>
        <button className="absolute left-1/4 bottom-4 bg-white text-black font-bold rounded-lg h-10 w-10">
          Contact Us
        </button>
      </div>
    </div>
  )
}
