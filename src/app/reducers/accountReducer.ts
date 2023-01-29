import { AccountOptions } from '../actions/accountActions';

export const accountFilter = (state = AccountOptions.SHOW_PROFILE, action) =>  {
    switch(action.type) {
        case 'SET_ACCOUNT_CONTENT':
            return AccountOptions.SHOW_ADVANCED
        default:
            return state
    }
}