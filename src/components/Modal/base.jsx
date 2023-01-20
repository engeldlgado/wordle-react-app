import { Dialog, Transition } from '@headlessui/react'
import CloseIcon from '@mui/icons-material/Close'
import { Fragment } from 'react'

export const BaseModal = ({ title, children, isOpen, handleClose }) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-10 overflow-y-auto'
        onClose={handleClose}
      >
        <div className='flex items-center justify-center min-h-full px-10 py-10 text-center sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 min-h-screen transition-opacity bg-gray-500 bg-opacity-75' />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='inline-block px-8 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-zinc-800 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle'>
              <button
                onClick={() => handleClose()}
                tabIndex={0}
                aria-pressed='false'
                className='absolute right-4 top-4'
              >
                <CloseIcon className='w-6 h-6 cursor-pointer dark:stroke-white' />
              </button>
              <div>
                <Dialog.Title
                  as='h3'
                  className='mb-4 text-2xl font-medium leading-6 text-center text-zinc-900 dark:text-zinc-100'
                >
                  {title}
                </Dialog.Title>
                <div className='mt-2'>{children}</div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
