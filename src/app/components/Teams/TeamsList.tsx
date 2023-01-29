import { useKeycloak } from '@react-keycloak/web';
import { Team, TeamUsers } from 'app/reducers/teams';
import React from 'react';
import { TeamRow } from './TeamRow';

export const TeamsList = ({ teams }: { teams: Team[] }) => {
    console.log(teams);

    const { keycloak: { tokenParsed: { sub: userId } = {} } } = useKeycloak()

    const getRole = (members: TeamUsers[]) => {
        const member = members.filter( (mem) => mem.userId === userId)[0]
        return member.role
    }

    return (
        <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
            <div className="grid grid-cols-1">
                {
                    teams.map( (team: Team) => {
                        return <TeamRow key={ team.id } id={ team.id } name={ team.name } role={ getRole(team.users) } description={team.description} />
                    })
                }
            </div>
        </div>
    );
}