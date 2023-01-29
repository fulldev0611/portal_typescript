import React from "react";

export const ErrorAlert = (props) => {
    return (
        <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
                <div className="ml-3">
                <div className="mt-2 text-sm leading-5 text-red-700">
                    <span>{props.message}</span>
                </div>
                </div>
            </div>
        </div>
    )
};