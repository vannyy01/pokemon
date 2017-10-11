import {createSelector} from 'reselect';
import _ from 'lodash';

const poksSelector = state => state.pokemons;

const getPoks = (poks) => {
    let selectedPosts = localStorage.getItem('fav_poks') || '[]';
    selectedPosts = JSON.parse(selectedPosts);
    let selectedPostsIDs = [];
    let i = 0;
    while (i < selectedPosts.length) {
        selectedPostsIDs[i] = parseFloat(selectedPosts[i].substr(4));
        i++;
    }
    const selectedPoks = _.filter(
        poks,
        pok =>
            _.includes(selectedPostsIDs, pok.pkdx_id)

    );
    return selectedPoks;
};

export default createSelector(
    poksSelector,
    getPoks
);