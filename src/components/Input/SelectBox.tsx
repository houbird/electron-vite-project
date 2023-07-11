import React, { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon, QuestionMarkCircleIcon } from '@heroicons/react/20/solid'
export interface FormFuncInput {
  updateType: string
  value: string
}

interface OptionType {
  name: string
  value: string
}

interface SelectBoxProps {
  children?: React.ReactNode
  labelTitle?: string
  tooltip?: string
  labelDescription?: string
  labelStyle?: string
  labelTR?: string
  labelBL?: string
  labelBR?: string
  defaultValue?: string
  containerStyle?: string
  updateType?: string
  updateFormValue: (input: { updateType: string | undefined, value: string }) => void
  options: OptionType[]
}

function SelectBox (props: SelectBoxProps) {
  const { labelTitle, tooltip, labelDescription, labelBL = '', labelBR = '', containerStyle = '', labelStyle = '', options = [], updateType, updateFormValue } = props
  const [selected, setSelected] = useState<OptionType | undefined>(options[0])

  if (!selected) {
    return <div>No options provided.</div>
  }

  return (
    <>
      <div className={`form-group ${containerStyle}`}>
        <div className="label">
          <span className={`label-text ${labelStyle}`}>
              { labelTitle }
              {tooltip && <div className="ml-1 tooltip tooltip-bottom" data-tip={tooltip}><QuestionMarkCircleIcon className='w-5 h-5'/></div>}
            </span>
          <span className="label-text label-text-alt">{ labelDescription }</span>
        </div>
        <Listbox value={selected.value} onChange={(value) => {
          const optionSelected = options.find((item) => (item.value === value))
          if (optionSelected) {
            setSelected(optionSelected)
            updateFormValue({ updateType, value })
          }
        }}>
          <div className="relative">
          <Listbox.Button className="relative w-full cursor-default rounded bg-white !p-2 text-left !leading-5 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
          <Listbox.Options className="absolute mt-1 ml-0 py-1 mb-4 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-700 text-base z-10 border border-gray-300 dark:border-gray-600 shadow focus:outline-none">
              {options.map((option, optionIdx) => (
                <Listbox.Option
                key={optionIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-1 pl-10 pr-4 text-textPrimary dark:text-white ${
                    active ? 'bg-primaryColor bg-opacity-50  ' : ''
                  }`
                }
                value={option.value}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {option.name}
                      </span>
                      {selected
                        ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-textPrimary dark:text-white">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                          )
                        : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
          </div>
        </Listbox>
        <div className="label">
          <span className="label-text label-text-alt">{ labelBL }</span>
          <span className="label-text label-text-alt">{ labelBR }</span>
        </div>
      </div>
    </>
  )
}

export default SelectBox
