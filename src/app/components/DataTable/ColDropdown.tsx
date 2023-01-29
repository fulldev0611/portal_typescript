import React from "react";
import { Dropdown } from "./DropDown";

export const ColDropdown = ( { className='', items } ): JSX.Element => {

    return (
        <>
            <div className={`flex self-center hover:bg-blue-100 dark:hover:bg-gray-700 rounded-md cursor-pointer w-8 ${className || ""}`}>
                <Dropdown items={items} />
            </div>
        </>
    );
};
