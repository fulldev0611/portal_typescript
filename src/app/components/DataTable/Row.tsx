import React from "react";

export const Row = ( { children, className } ): JSX.Element => {

    return (
        <>
            <div className={`flex flex-grow flex-row w-full px-3 py-3 justify-between transition ease-in-out ${className}`}>
                {children}
            </div>
        </>
    );
};
