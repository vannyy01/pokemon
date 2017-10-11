import _ from "lodash";
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost} from "../actions/fetch";
import {fetchImg} from "../actions/fetchImg";
import Post from './post';
import IMG from '../img/Ukulele-Pichu.jpg';

import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;

//import { Dropdown, Input } from 'semantic-ui-react';

class PokemonIndex extends Component {
    constructor(props) {
        super(props);
        this.isActiveHeart.bind(this);
        this.isActiveElement = this.isActiveElement.bind(this);
        this.renderInfo = this.renderInfo.bind(this)
    }

    state = {
        selectedIndex: 0,
        char: '',
    };
    select = (index) => this.setState({selectedIndex: index});

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
        return _.map(this.props.pokemons, post => {
                return (
                    <Post isActiveHeart={this.isActiveHeart} isActiveElement={this.isActiveElement} key={post.pkdx_id}
                          info={post}
                          img={this.props.fetchImg
                          }/>
                )
            }
        );
    }

    renderInfo() {
        const div = document.getElementsByClassName('active-el');
        if (div.length === 1) {
            let id = [];
            id[0] = parseFloat(div[0].id.substr(8));
            const selectedPoks = _.filter(
                this.props.pokemons,
                pok =>
                    _.includes(id, pok.pkdx_id)
            );
            const selectedPok = selectedPoks[0];
            console.log(selectedPok);
            const char = (
                <div className="card">
                    <div className="card-body">
                        <img className="card-img-top border border-primary rounded-0"
                             src={IMG}
                             alt="Card image cap"/>
                        <h2>{selectedPok.name + " #" + selectedPok.pkdx_id}</h2>
                        <table className="table table-sm">
                            <thead>
                            <tr>
                                <th>Type</th>
                                <th>{_.capitalize(selectedPok.types[0].name) +" " + _.capitalize(selectedPok.types[1].name)}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Attack</td>
                                <td>{selectedPok.attack}</td>
                            </tr>
                            <tr>
                                <td>Defense</td>
                                <td>{selectedPok.defense}</td>
                            </tr>
                            <tr>
                                <td>HP</td>
                                <td>{selectedPok.hp}</td>
                            </tr>
                            <tr>
                                <td>SP Attack</td>
                                <td>{selectedPok.sp_atk}</td>
                            </tr>
                            <tr>
                                <td>SP Defense</td>
                                <td>{selectedPok.sp_def}</td>
                            </tr>
                            <tr>
                                <td>Speed</td>
                                <td>{selectedPok.speed}</td>
                            </tr>
                            <tr>
                                <td>Weight</td>
                                <td>{selectedPok.weight}</td>
                            </tr>
                            <tr>
                                <td>Total moves</td>
                                <td>{selectedPok.total}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            );
            this.setState({char : char});
        }
    }

    render() {
        return (
            <div >
                <div className="header">
                    <a className="btn btn-primary" id="link" href="/favourites">Favourites</a>
                    <div className="head-page border border-dark">
                        <h3 id="main-header">Pokedex</h3>
                    </div>
                </div>

                <MuiThemeProvider>
                    <BottomNavigation selectedIndex={this.state.selectedIndex}>
                        <BottomNavigationItem
                            label="Recents"
                            icon={recentsIcon}
                            onClick={() => this.select(0)}
                        />
                        <BottomNavigationItem
                            label="Favorites"
                            icon={favoritesIcon}
                            onClick={() => this.select(1)}
                        />
                    </BottomNavigation>
                </MuiThemeProvider>
                <div className="post-wrapper">
                    {this.renderPokemons()}
                    <button onClick={this.renderInfo} type="button"
                            className="btn btn-primary btn-lg btn-block load-btn">Load more
                    </button>
                </div>
                <div className="d-flex justify-content-end pok-info">
                {this.state.char}
                </div>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        pokemons: state.pokemons,
        images: state.images,
    };
}

export default connect(mapStateToProps, {fetchPost, fetchImg})(PokemonIndex);