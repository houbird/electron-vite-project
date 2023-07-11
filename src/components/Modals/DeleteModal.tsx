import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'

interface Props {
  open?: boolean
  children?: React.ReactNode
  title?: string
  onSave?: () => void
  onClose?: () => void
}

export default function Modal ({
  open,
  children,
  title = 'Default Title',
  onSave = () => {},
  onClose = () => {}
}: Props) {
  const cancelButtonRef = useRef(null)
  return (
    <Transition.Root appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={(e) => {
          onClose()
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="modal" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="modal-dialog">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="modal-content">
                <Dialog.Title as="h3" className="modal-header">{title}</Dialog.Title>
                <div className="modal-body">
                  {children}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn-danger w-full mb-1 !text-danger !bg-transparent border-none sm:w-auto sm:mb-0"
                    onClick={() => {
                      onSave()
                      onClose()
                    }}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="w-full mb-1 sm:w-auto sm:mb-0"
                    onClick={() => {
                      onClose()
                    }}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
