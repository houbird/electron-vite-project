import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

interface AlertModalProps {
  title: string
  closeTitle?: string
  open: boolean
  children?: React.ReactNode
  onClose: () => void
}

export default function AlertModal ({ title, closeTitle = 'Got it, thanks!', open, children, onClose }: AlertModalProps) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={onClose}>
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
                  <Dialog.Description>{children}</Dialog.Description>
                </div>

                <div className="modal-footer">
                    <button
                      type="button"
                      className="w-full mb-1 sm:w-auto sm:mb-0"
                      onClick={onClose}
                    >
                      {closeTitle}
                    </button>
                  </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
