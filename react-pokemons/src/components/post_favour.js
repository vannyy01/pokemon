import _ from "lodash";
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost} from "../actions/fetch";
import {fetchImg} from "../actions/fetchImg";
import SelectedPoks from '../selectors/selected_poks';
import Post from './post';
import renderInfo from './info';
import {isActiveElement, isActiveHeart} from './isActives';

class PokemonFavour extends Component {
    constructor(props) {
        super(props);
        isActiveHeart.bind(this);
        this.isActiveElement = isActiveElement.bind(this);
        this.renderInfo = renderInfo.bind(this);
    }

    state = {
        char: '',
    };

    componentWillMount() {
        this.props.fetchPost();
    }

    componentDidUpdate() {
        this.isActiveHeart = isActiveHeart();
        this.isActiveElement = isActiveElement();
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
                <div className="container-fluid">
                    <div className="row">
                        <div className="post-wrapper
                        col-xl-5 col-lg-6 col-md-12 col-sm-12">
                            {this.renderPokemons()}
                            <button onClick={() => this.setState({char: this.renderInfo(this.props.pokemons)})}
                                    type="button"
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
        poks: SelectedPoks(state)
    };
}

export default connect(mapStateToProps, {fetchPost, fetchImg})(PokemonFavour);
//export default PokemonFavour