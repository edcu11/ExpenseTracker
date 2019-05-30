import * as types from './actionTypes';

import {
    CLEAR_SESSION,
    CLEAN_REDUCER
} from '../../constants/actionTypes';

const initState = {
    accounts: [],
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case types.GET_ACCOUNTS:
            return { ...state, accounts: [...action.payload] };
        case CLEAN_REDUCER:
            return initState;
        case CLEAR_SESSION:
            return initState;
        default:
            return initState;
    }
};

export default reducer;