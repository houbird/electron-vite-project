import Inbox from '@heroicons/react/24/solid/InboxIcon'

function DataNotFound () {
  return (
    <>
    <div className="flex flex-col items-center justify-center w-full h-full my-auto no-select pointer-events-none">
      <Inbox className="max-w-[6rem] h-auto text-gray-600 dark:text-gray-300 text-opacity-50"/>
      <p className='mb-0 text-sm whitespace-nowrap'>Data Not Found</p>
    </div>
    </>
  )
}

export default DataNotFound
