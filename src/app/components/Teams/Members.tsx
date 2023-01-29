import React from 'react';
import { MemberRow } from './MemberRow';
import { BackToTeams } from './BackToTeamsLink';

const membersMock = [
    {
        id: 'k23m4-j23kjn2-l2jn3l3',
        name: 'Thomas Born',
        status: 'active',
        role: 'owner',
    },
    {
        id: 'k23m4-j23kjn2-l2jn3l2',
        name: 'Spencer McCracken',
        status: 'invited',
        role: 'member',
    },
    {
        id: 'k23m4-j23kjn2-l2jn3l4',
        name: 'Bill Guy',
        status: 'inactive',
        role: 'member',
    }
];

export const Members = ({ members }) => {

    return (
        <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
            <BackToTeams />
            <div className="grid grid-cols-1">
                {
                    membersMock.map( mem => {
                        return <MemberRow id={ mem.id } name={ mem.name } role={ mem.role } status={ mem.status } />
                    })
                }
            </div>
        </div>
    );
}