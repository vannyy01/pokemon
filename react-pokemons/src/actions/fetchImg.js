import axios from 'axios';

export const FETCH_IMG = 'FETCH_IMG';

const ROOT_URL = 'https://pokeapi.co/media/img';

export function fetchImg(i) {
    const img = i + '.png';
    const request = axios.get(`${ROOT_URL}/${img}`);
    return {
        type: FETCH_IMG,
        payload: request
    };
}