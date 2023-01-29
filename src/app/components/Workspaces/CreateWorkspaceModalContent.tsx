import { Dialog, Transition } from '@headlessui/react';
import _ from 'lodash';
import React, { Fragment, useRef, useState } from 'react';

export const CreateWorkspaceModalContent = ({ setOpen, handleCreate, name, description }) => {

    const saveButtonRef = useRef(null);
    const initalFormValues = {
        name: '',
        description: ''
    };
    const [formValues, setFormValues] = useState(initalFormValues);
    const [disableButton, setDisableButton] = useState(true);

    const noChanges = (a, b) => _.isEqual(a, b);

    const handleValueChange = (event) => {
        const id  = event.target.name;
        const value = event.target.value;
        const newObj = Object.assign({
            name: formValues.name,
            description: formValues.description
        }, { [id]: value })

        // TODO: This is off by one...
        setFormValues(newObj);
        setDisableButton(noChanges(initalFormValues, formValues));
    }

    const handleSave = () => {
        handleCreate(formValues);
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
                <div className="mt-2 text-center">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        Create Workspace
                    </Dialog.Title>
                    <div className="mt-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Workspace name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            autoComplete="given-name"
                            value={ formValues.name }
                            onChange={ handleValueChange }
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                        />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            rows={3}
                            value={ formValues.description }
                            onChange={ handleValueChange }
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                        />
                    </div>
                </div>
            </div>
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                    type="button"
                    className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-${disableButton ? 'gray' : 'indigo'}-600 text-base font-medium text-white hover:bg-${disableButton ? 'gray' : 'indigo'}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${disableButton ? 'gray' : 'indigo'}-500 sm:col-start-2 sm:text-sm`}
                    onClick={() => handleSave()}
                    disabled={disableButton}
                    >
                    Save
                </button>
                <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={saveButtonRef}
                    >
                    Cancel
                </button>
            </div>
        </div>
        </Transition.Child>
    </div>
    )
}