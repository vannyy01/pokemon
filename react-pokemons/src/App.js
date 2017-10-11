import React, {Component} from 'react';
import './style/App.css';
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import promise from 'redux-promise';

import reducers from "./reducers";
import PokemonIndex from './components/posts_index';
import PokemonFavour from './components/post_favour';


const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

class App extends Component {

    render() {
        return (
            <Provider store={createStoreWithMiddleware(reducers)}>
                <BrowserRouter>
                    <div>
                        <Switch>
                            <Route exact path="/" component={PokemonIndex}/>
                            <Route path="/favourites" component={PokemonFavour}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </Provider>
    )
    }
    }

    export default App;
