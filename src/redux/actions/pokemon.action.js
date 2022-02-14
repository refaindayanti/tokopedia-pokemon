import axios from "axios";
import { actionTypes } from "../actionTypes"
import { URL_API } from "../../configs/environments";

export const getAllPokemon = () => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.get_pokemon_request
        })

        return axios.get(`${URL_API}/pokemon`).then(
            (response) => {
                dispatch({
                    type: actionTypes.get_pokemon_success,
                    payload: response.data.results
                });
                return response;
            },
            (error) => {
                dispatch({
                    type: actionTypes.get_pokemon_error,
                    message: error
                });
                throw error;
            }
        )
    };
}

export const getOnePokemon = (name) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.get_detail_request
        })

        return axios.get(`${URL_API}/pokemon/${name}`).then(
            (response) => {
                dispatch({
                    type: actionTypes.get_detail_success,
                    payload: response.data
                });
                return response;
            },
            (error) => {
                dispatch({
                    type: actionTypes.get_detail_error,
                    message: error
                });
                throw error;
            }
        )
    };
}