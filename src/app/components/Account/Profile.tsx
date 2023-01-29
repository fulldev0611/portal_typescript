import React, { useState } from 'react';

export const Profile = ({ user }) => {
    const [formValues, setFormValues] = useState({
        firstName: user.firstName,
        lastName: user.lastName || '',
        email: user.email || ''
    });

    const handleValueChange = (event) => {
        const id  = event.target.name;
        const value = event.target.value;
        const newObj = Object.assign({
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            email: formValues.email
        }, { [id]: value })

        // TODO: This is off by one...
        setFormValues(newObj);
        // setDisableButton(noChanges(initalFormValues, formValues));
    }

    const handleAccountUpdate = () => {
        //TODO: Issue with backend
    }

  return (
    <>
        <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
            <form action="#" method="POST">
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="bg-white py-6 px-6 space-y-6 sm:p-6">
                        <div className = "account-title">
                            <h3 className="text-2xl leading-6 font-medium text-gray-900 font-sans">Account Information</h3>
                        </div>

                        <div className="grid grid-cols-6 gap-6 font-sans text-base">
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="first-name" className="block px-1 py-1 font-sans text-base font-medium text-gray-700">
                                    First name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    autoComplete="given-name"
                                    value={ formValues.firstName }
                                    onChange={ handleValueChange }
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="last-name" className="block px-1 py-1 text-base font-sans font-medium text-gray-700">
                                    Last name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    autoComplete="family-name"
                                    value={ formValues.lastName }
                                    onChange={ handleValueChange }
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="email-address" className="block px-1 py-1 text-base font-sans font-medium text-gray-700">
                                    Email address
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    autoComplete="email"
                                    value={ formValues.email }
                                    onChange={ handleValueChange }
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-center sm:px-6 mb-2">
                        <button
                            type="button"
                            className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-1 px-4 inline-flex justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => handleAccountUpdate()}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </>
  )
}