import { ChevronRightIcon } from "@heroicons/react/outline";
import React from "react"
import { useHistory } from "react-router-dom";
import { Col } from "../DataTable/Col"
import { Row } from "../DataTable/Row"

export const TeamRow = ( { id, name, role='', description= '' } ) => {
    const history = useHistory();

    const handleTeamClick = () => {
        history.push(`/teams/${id}/edit`);
    };
    
    return (
        <Row className="whitespace-nowrap py-6 px-6 hover:bg-gray-200">
            <Col className="w-3/12 flex flex-col my-auto">
                <div className="text-gray-500 dark:text-gray-400 overflow-ellipsis truncate">{name}</div>
            </Col>
            <Col className="w-6/12 flex flex-col my-auto">
                <div className="text-gray-500 dark:text-gray-400 overflow-ellipsis truncate">{description}</div>
            </Col>
            <Col className="w-3/12 flex flex-col my-auto">
                <div className="text-gray-500 dark:text-gray-400 overflow-ellipsis truncate">{role}</div>
            </Col>
            <ChevronRightIcon onClick={handleTeamClick} className="h-5 w-5 cursor-pointer" aria-hidden="true" />
        </Row>
    )
}