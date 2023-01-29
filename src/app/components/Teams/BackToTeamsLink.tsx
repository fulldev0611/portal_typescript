import React from "react"
import { ChevronLeftIcon } from "@heroicons/react/outline";
import _ from "lodash";
import { useHistory } from "react-router-dom";

export const BackToTeams = () => {
    const history = useHistory();

    const handleBackClick = () => {
        history.push(`/teams`);
    };
    
    return (
        <>
            <div className="flex">
                <ChevronLeftIcon onClick={handleBackClick} className="h-5 w-5 cursor-pointer" aria-hidden="true" />
                <span onClick={handleBackClick} className="mx-1 cursor-pointer">Teams</span>
            </div>
        </>
    )
}