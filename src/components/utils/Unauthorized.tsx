import FaceFrown from '@heroicons/react/24/solid/FaceFrownIcon'

function Unauthorized () {
  return (
    <>
    <div className="flex flex-col items-center justify-center w-full h-full no-select pointer-events-none">
      <FaceFrown className="max-w-[6rem] h-auto text-gray-600 dark:text-gray-300 text-opacity-50"/>
      <p className='mb-0 text-sm whitespace-nowrap'>Unauthorized</p>
    </div>
    </>
  )
}

export default Unauthorized
