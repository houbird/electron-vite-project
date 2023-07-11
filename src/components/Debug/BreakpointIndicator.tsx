import React from 'react'

const BreakpointIndicator = () => {
  return (
    <div className="fixed bottom-0 right-0 bg-white dark:bg-gray-900 p-2 text-xs rounded-tl-xl font-bold z-50">
      Current Breakpoint:
      <span className="hidden text-gray-700 bg-red-200 px-1 rounded-full ml-1 sm:inline-block">SM</span>
      <span className="hidden text-gray-700 bg-red-200 px-1 rounded-full ml-1 md:inline-block">MD</span>
      <span className="hidden text-gray-700 bg-red-200 px-1 rounded-full ml-1 lg:inline-block">LG</span>
      <span className="hidden text-gray-700 bg-red-200 px-1 rounded-full ml-1 xl:inline-block">XL</span>
      <span className="hidden text-gray-700 bg-red-200 px-1 rounded-full ml-1 2xl:inline-block">2XL</span>
    </div>
  )
}

export default BreakpointIndicator
