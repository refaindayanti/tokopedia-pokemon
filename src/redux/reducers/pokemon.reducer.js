// import { getLocalStorage } from '../helpers/getLocalStorage'
import { actionTypes } from '../actionTypes'

const initialState = {
    data: {}
}

const pokemonReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.get_pokemon_request: {
            return {
                ...state,
            };
        }

        case actionTypes.get_pokemon_success: {
            return {
                ...state,
                data: action.payload
            };
        }

        case actionTypes.get_pokemon_error: {
            return {
                ...state,
                message: action.message
            };
        }

        default:
            return state;
    }
};

export default pokemonReducer;