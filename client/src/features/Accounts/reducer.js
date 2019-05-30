import * as types from './actionTypes';

import {
    CLEAR_SESSION,
    CLEAN_REDUCER
} from '../../constants/actionTypes';

const initState = {
    accounts: [],
    accountId: 0
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case types.GET_ACCOUNTS:
            return { ...state, accounts: [...action.payload] };
        case types.CLEAR_ACCOUNTS:
            return { ...state, accounts: [] };
        case types.SELECT_ACCOUNT:
            return { ...state, accountId: action.id };
        case CLEAN_REDUCER:
            return initState;
        case CLEAR_SESSION:
            return initState;
        default:
            return initState;
    }
};

export default reducer;