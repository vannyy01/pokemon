import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const recentsIcon = <FontIcon className=" list-icon"></FontIcon>;
const favoritesIcon = <FontIcon className="fav-icon"></FontIcon>;

class Main extends Component {
    state = {
        selectedIndex: 0,
    };
    select = (index) => {
        this.setState({selectedIndex: index});
        console.log(this.state.selectedIndex);

    };

    render() {
        return (
            <div>
                <div className="header">
                    <div className="head-page border border-dark">
                        <h3 id="main-header">Pokedex</h3>
                    </div>
                </div>
                <div className="header-2">
                    <MuiThemeProvider>
                        <BottomNavigation selectedIndex={this.state.selectedIndex}>
                            <NavLink to="/" activeStyle={{width: '10%'}}>
                                <BottomNavigationItem
                                    label="Home"
                                    icon={recentsIcon}
                                    onClick={() => this.select(0)}
                                />
                            </NavLink>
                            <NavLink to="/all" activeStyle={{width: '10%'}}>
                                <BottomNavigationItem
                                    label="All"
                                    icon={recentsIcon}
                                    onClick={() => this.select(1)}
                                />
                            </NavLink>
                            <NavLink to="/favourites" activeStyle={{width: '10%'}}>
                                <BottomNavigationItem
                                    label="Favorites"
                                    icon={favoritesIcon}
                                    onClick={() => this.select(2)}
                                />
                            </NavLink>
                        </BottomNavigation>
                    </MuiThemeProvider>
                </div>
            </div>
        )
    }
}

export default Main;