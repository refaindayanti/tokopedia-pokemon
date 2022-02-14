import { combineReducers } from 'redux';
import pokemonReducer from './pokemon.reducer';
import detailReducer from './detail.reducer';

const appReducer = combineReducers({
    pokemonReducer,
    detailReducer
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;