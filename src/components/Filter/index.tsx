
import React, { useState, Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import FunnelIcon from '@heroicons/react/24/solid/FunnelIcon'

export interface Option {
  label: string
  value: string
}

export interface FilterMenuProps {
  options: Option[]
  onChange: (options: string[]) => void
  initialValue: string[]
}

const FilterMenu = ({ options, onChange, initialValue }: FilterMenuProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(initialValue)

  const handleOptionChange = (option: string) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((value) => value !== option)
      : [...selectedOptions, option]

    setSelectedOptions(updatedOptions)
    onChange(updatedOptions)
  }

  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button className='!px-2 !leading-5'>
            <FunnelIcon className='w-4 h-4 inline-block -mt-1' /> Status
          </Popover.Button>

          <Transition
            show={open}
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Popover.Panel static className='flex flex-col p-2 px-4 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 shadow absolute z-10'>
              <h4>Filter</h4>
              {options.map((option) => (
                <a
                  key={option.value}
                  className={`badge ${selectedOptions.includes(option.value) ? 'badge-primary' : ''}`}
                  onClick={() => {
                    handleOptionChange(option.value)
                  }}
                >
                  {option.label}
                </a>
              ))}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default FilterMenu
