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
import {Dropdown, Input} from 'semantic-ui-react';

const recentsIcon = <FontIcon  className=" list-icon"></FontIcon>;
const favoritesIcon = <FontIcon className="fav-icon"></FontIcon>;


const tagOptions = [
    {
        text: 'Important',
        value: 'Important',
        label: {color: 'green', empty: true, circular: true},
    }
];

const DropdownExampleSearchInMenu = () => (
    <Dropdown text='Filter Posts' icon='filter' floating labeled button className='icon'>
        <Dropdown.Menu>
            <Input icon='search' iconPosition='left' className='search'/>
            <Dropdown.Divider/>
            <Dropdown.Header icon='tags' content='Tag Label'/>
            <Dropdown.Menu scrolling>
                {tagOptions.map(option => <Dropdown.Item key={option.value} {...option} />)}
            </Dropdown.Menu>
        </Dropdown.Menu>
    </Dropdown>
);

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

            const char = (
                <div className="card border border-dark pok-info-card" style={{height: '48%'}}>
                    <div className="card-body">
                        <img className="card-img-top border border-primary rounded-0"
                             src={IMG}
                             alt="Card image cap"/>
                        <h2>{selectedPok.name + " #" + selectedPok.pkdx_id}</h2>
                        <table className="table table-sm table-bordered">
                            <thead>
                            <tr>
                                <th>Type</th>
                                <th>{selectedPok.types.map(type =>
                                    _.capitalize(type.name) + ' '
                                )}</th>
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
            this.setState({char: char});
            const info_block = document.getElementsByClassName('post-wrapper');
            info_block[0].classList.add('mediaTop');
        }
    }

    render() {
        return (
            <div>
                <div className="header">
                    <a className="btn btn-primary" id="link" href="/favourites">Favourites</a>
                    <div className="head-page border border-dark">
                        <h3 id="main-header">Pokedex</h3>
                    </div>
                </div>
                <div className="header" style={{marginBottom: '10px', width: '70%'}}>
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
                    {DropdownExampleSearchInMenu()}

                </div>


                <div className="container-fluid">
                    <div className="row">
                        <div className="post-wrapper
                        col-xl-5 col-lg-6 col-md-12 col-sm-12">

                            {this.renderPokemons()}
                            <button onClick={this.renderInfo} type="button"
                                    className="btn btn-primary btn-lg btn-block load-btn">Load more
                            </button>
                        </div>
                        <div className="d-flex justify-content-end pok-info
                        col-xl-7  col-lg-6 col-md-12 col-sm-12">
                            {this.state.char}
                        </div>
                    </div>
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