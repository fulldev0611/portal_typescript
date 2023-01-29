import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/solid';
import React, { Fragment, useRef } from 'react';

export const DeleteWorkspaceModalContent = ({ setOpen, handleDelete, name }) => {

    const deleteButtonRef = useRef(null);

    const handleClick = () => {
        handleDelete();
        setOpen(false);
    }

    return (
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        {/* This element is to trick the browser into centering the modal contents. */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
        </span>
        <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <div>
                <div className="mx-auto flex items-center justify-center">
                <ExclamationIcon className="h-12 w-12 text-red-600" aria-hidden="true" />
                </div>
                <div className="mt-2 text-center">
                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Delete Workspace
                </Dialog.Title>
                <div className="mt-2">
                    <p className="text-sm text-gray-500">
                        This action will delete {name}. Your workspace will be unavailable to open until ...
                    </p>
                </div>
                </div>
            </div>
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                onClick={() => handleClick()}
                >
                Delete
                </button>
                <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                onClick={() => setOpen(false)}
                ref={deleteButtonRef}
                >
                Cancel
                </button>
            </div>
        </div>
        </Transition.Child>
    </div>
    )
}