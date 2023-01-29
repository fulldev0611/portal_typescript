import React from "react";

export const Col = ( { className, children } ): JSX.Element => {

    return (
        <>
            <div className={`flex-grow mx-1 ${className || ""}`}>
                {children}
            </div>
        </>
    );
};
