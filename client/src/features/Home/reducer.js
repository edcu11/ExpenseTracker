import * as types from './actionTypes';

import {
    CLEAR_SESSION,
    CLEAN_REDUCER
} from '../../constants/actionTypes';

const initState = {
    expenses: [],
    categories: [],
    expensesCount: 0,
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case types.GET_EXPENSES:
            return { ...state, expenses: [...action.payload, ...state.expenses] };
        case types.GET_CATEGORIES:
            return { ...state, categories: action.payload };
        case types.CLEAR_EXPENSES:
            return { ...state, expenses: [] };
        case types.GET_EXPENSES_COUNT:
            return { ...state, expensesCount: action.count };
        case CLEAN_REDUCER:
            return initState;
        case CLEAR_SESSION:
            return initState;
        default:
            return initState;
    }
};

export default reducer;