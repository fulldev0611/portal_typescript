import { SearchIcon } from "@heroicons/react/outline";
import React from "react";

export const Search = ({ type }) => {
    return (
      <div className="w-2/12 mb-2">
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            name="account-number"
            id="account-number"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-b border-gray-300 rounded-md"
            placeholder={`Search for ${type}`}
          />
        </div>
      </div>
    )
}