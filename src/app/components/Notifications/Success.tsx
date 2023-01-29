import React from "react";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SuccessNotification = (props) => {
    return (
        <>
            <div className="flex items-center justify-center items-start">
                <div className="flex-shrink-0">
                    <FontAwesomeIcon icon={ faCheckCircle } color='#32CD32' />
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-800">
                        {props.message}
                    </p>
                </div>
            </div>
        </>
    )
};