import React from "react";
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ErrorNotification = (props) => {
    return (
        <>
            <div className="p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <FontAwesomeIcon icon={ faTimesCircle } color='#e04848'/>
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                        <p className="text-sm font-medium text-gray-900">
                            { props.message }
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
};