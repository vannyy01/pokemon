import _ from "lodash";
import {FETCH_POSTS} from "../actions/fetch";
import {FETCH_IMG} from "../actions/fetchImg";

const INITIAL_STATE = {pokemons: []};

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_POSTS:
            return  {...state, pokemons: action.payload.data.objects};
        case FETCH_IMG:
            return {...state, images: action.payload.data};
        default:
            return state;
    }
}