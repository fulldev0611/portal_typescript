import React from 'react';

export const BasicInput = ({ label }) => {
    return (
        <div>
            <label htmlFor="email" className="sr-only">
                Search
            </label>
            <input
                type="text"
                name="search"
                id="search"
                className="block w-full focus:outline-none sm:text-sm border-b-2 border-t-0 border-r-0 border-l-0 border-indigo-500"
                placeholder={ label }
            />
        </div>
    )
}