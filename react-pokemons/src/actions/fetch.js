import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';

const ROOT_URL = 'https://pokeapi.co/api/v1/pokemon/?limit=12';

export function fetchPost() {
    const request = axios.get(`${ROOT_URL}`);
    return {
        type: FETCH_POSTS,
        payload: request
    };
}