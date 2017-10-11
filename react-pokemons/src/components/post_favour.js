import _ from "lodash";
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost} from "../actions/fetch";
import {fetchImg} from "../actions/fetchImg";
import SelectedPoks from '../selectors/selected_poks';
import Post from './post';



class PokemonFavour extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counterActiveElements: 0,
            class: 'active-el'
        };

        this.isActiveHeart.bind(this);
        this.isActiveElement = this.isActiveElement.bind(this);
    }

    componentWillMount() {
        this.props.fetchPost();
    }

    componentDidUpdate() {
        this.isActiveHeart();
        this.isActiveElement();
    }

    isActiveElement() {
        const divs = document.getElementsByClassName('card-body');
        const active = document.getElementsByClassName('active-el') || '[]';
        for (let i = 0; i < divs.length; i++) {
            divs[i].onclick = function (e) {
                if (active.length < 1 && e.target.id === this.id) {
                    this.classList.add('active-el');
                } else if (active.length >= 1 && e.target.id === this.id) {
                    this.classList.remove('active-el');
                }
            }
        }
    }

    isActiveHeart() {
        let fav_poks = localStorage.getItem('fav_poks') || '[]';
        fav_poks = JSON.parse(fav_poks);
        let div_poks = document.querySelectorAll("svg[id^='pok-']");
        for (let i = 0; i < div_poks.length; i++) {

            if (true === fav_poks.includes(div_poks[i].id)) {
                let object = document.getElementById(div_poks[i].id);
                object.setAttribute("fill", "#f72e2e");
            }
        }
    }

    renderPokemons() {
        return _.map(this.props.poks, post => {
                return (
                    <Post isActiveHeart={this.isActiveHeart} isActiveElement={this.isActiveElement} key={post.pkdx_id}
                          info={post}
                          img={this.props.fetchImg
                          }/>
                )
            }
        );
    }



    render() {
        return (
            <div>
                <div className="header">
                    <a className="btn btn-primary" id="link" href="/favourites">Favourites</a>
                    <div className="head-page border border-dark">
                        <h3 id="main-header">Liked poks</h3>
                    </div>
                </div>
                <div className="post-wrapper">
                    {this.renderPokemons()}
                </div>
            </div>
        )
    }
/**render(){
    return(
        <div>
            <h2>Favourite pokemons</h2>
        </div>
    )

    }**/
}

function mapStateToProps(state) {
    return {
        pokemons: state.pokemons,
        images: state.images,
        poks: SelectedPoks(state)
    };
}

export default connect(mapStateToProps, {fetchPost, fetchImg})(PokemonFavour);
//export default PokemonFavour