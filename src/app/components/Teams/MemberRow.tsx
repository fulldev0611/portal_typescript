import _ from "lodash";
import React from "react"
import { Col } from "../DataTable/Col"
import { ColDropdown } from "../DataTable/ColDropdown"
import { DropdownItem } from "../DataTable/DropDown";
import { Row } from "../DataTable/Row"

const statuses = [
    {
        status: 'active',
        color: 'green'
    },
    {
        status: 'invited',
        color: 'yellow'
    },
    {
        status: 'inactive',
        color: 'red'
    },
];

export const MemberRow = ( { id, name, role='', status='' } ) => {
    const getBadgeColor = (status: string) => {
        const statusObj = _.find(statuses, { status }) || { color: 'gray' }
        return statusObj.color;
    };

    const rowItems: DropdownItem[] = [
        {
            title: 'Edit',
            link: `${id}.officekube.io`
        },
        {
            title: 'Remove',
            href: "",
            onClick: () => console.log('Remove')
        },
    
    ];
    
    return (
        <Row className="whitespace-nowrap py-6 px-6 hover:bg-gray-200">
            <Col className="w-3/12 flex flex-col my-auto">
                <div className="text-gray-500 dark:text-gray-400 overflow-ellipsis truncate">{name}</div>
            </Col>
            <Col className="w-4/12 flex flex-col my-auto">
                <div className="text-gray-500 dark:text-gray-400 overflow-ellipsis truncate">{role}</div>
            </Col>
            <Col className="my-auto">
                <div className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-${getBadgeColor(status)}-100 text-${getBadgeColor(status)}-800`}>{status}</div>
            </Col>
            <ColDropdown items={rowItems} />
        </Row>
    )
}