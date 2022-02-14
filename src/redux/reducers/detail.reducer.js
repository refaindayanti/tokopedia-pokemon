// import { getLocalStorage } from '../helpers/getLocalStorage'
import { actionTypes } from '../actionTypes'

const initialState = {
    data: {}
}

const detailReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.get_detail_request: {
            return {
                ...state,
            };
        }

        case actionTypes.get_detail_success: {
            return {
                ...state,
                data: action.payload
            };
        }

        case actionTypes.get_detail_error: {
            return {
                ...state,
                message: action.message
            };
        }

        default:
            return state;
    }
};

export default detailReducer;