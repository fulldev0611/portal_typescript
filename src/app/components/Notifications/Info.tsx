import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const InfoNotification = (props) => {
    return (
        <>
            <div className="p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <FontAwesomeIcon icon={ faInfoCircle } color='#3364ad' />
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