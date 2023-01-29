import { GET_TEAMS, GET_TEAMS_FAILURE, GET_TEAMS_SUCCESS } from 'app/actions/teams';
import _ from 'lodash';

export type TeamUsers = {
    userId: string,
    role: string,
    status: string,
}

export type Team = {
    id: string,
    name: string,
    description: string,
    status: string
    users: TeamUsers[]
}

type InitTeamState = {
    loading: boolean,
    queried: boolean,
    error: boolean,
    teams: Team[]
}

const INITIAL_STATE: InitTeamState = {
    loading: false,
    queried: false,
    error: false,
    teams: [],
};


export const teamsReducer = (state = INITIAL_STATE, action): InitTeamState => {
    switch(action.type) { 
        case GET_TEAMS:
            return { ...state, loading: true, queried: true };
        case GET_TEAMS_SUCCESS:
            return { 
                ...state, 
                loading: false,
                error: false,
                teams: action.payload.teams
            };
        case GET_TEAMS_FAILURE:
            return { ...state, loading: false, error: true };
        default:
            return state;
    }
};
