import React, {Component} from 'react';
import IMG from '../img/Ukulele-Pichu.jpg';
import _ from 'lodash';


const image = "https://pokeapi.co";


function IconLove(id) {

    return (
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" id={"pok-" + id} fill="black" width="40" height="40"
             viewBox="0 0 37 32">\

            <title>heart3</title>
            <path
                d="M27 0c-2.476 0-4.856 0.921-6.704 2.595-0.702 0.635-1.303 1.357-1.796 2.154-0.493-0.797-1.094-1.519-1.796-2.155-1.848-1.673-4.228-2.594-6.704-2.594-5.514 0-10 4.486-10 10 0 3.722 1.158 6.66 3.871 9.825 3.942 4.6 13.919 11.62 14.342 11.917 0.086 0.061 0.187 0.091 0.287 0.091s0.201-0.030 0.287-0.091c0.423-0.297 10.4-7.317 14.343-11.917 2.712-3.165 3.87-6.103 3.87-9.825 0-5.514-4.486-10-10-10zM32.371 19.175c-3.495 4.076-12.18 10.341-13.871 11.545-1.691-1.204-10.376-7.469-13.87-11.545-2.545-2.969-3.63-5.713-3.63-9.175 0-4.963 4.038-9 9-9 2.227 0 4.37 0.829 6.032 2.335 0.838 0.76 1.518 1.656 2.020 2.664 0.17 0.34 0.726 0.34 0.896 0 0.502-1.008 1.182-1.904 2.020-2.663 1.662-1.507 3.805-2.336 6.032-2.336 4.962 0 9 4.037 9 9 0 3.462-1.085 6.206-3.629 9.175z"></path>
        </svg>

    )
}


function renderTypes(types) {
    return types.map((type) => {
            switch (type.name) {
                case "poison":
                    return <a key={type.name} className="btn btn-dark"
                                   href={image + type.resource_uri}>{_.capitalize(type.name)}</a>;
                case "water":
                    return <a key={type.name} className="btn btn-primary"
                                   href={image + type.resource_uri}>{_.capitalize(type.name)}</a>;
                case "bug":
                    return <a key={type.name} className="btn btn-success"
                                   href={image + type.resource_uri}>{_.capitalize(type.name)}</a>;

                case "flying":
                    return <a key={type.name} className="btn btn-info"
                                   href={image + type.resource_uri}>{_.capitalize(type.name)}</a>;
                case "normal":
                    return <a key={type.name} className="btn btn-secondary"
                                   href={image + type.resource_uri}>{_.capitalize(type.name)}</a>;
                default:
                    return false;
            }
        }
    )
}

class Post extends Component {

    constructor(props) {
        super(props);

        this.chooseElem = this.chooseElem.bind(this);
    }


    chooseElem(e) {
        const key = 'fav_poks';
        const el = e.target;
        const id = el.id;
        const cash = localStorage.getItem(key) || '[]';
        const curCash = JSON.parse(cash);
        if ("#f72e2e" === el.getAttribute("fill")) {
            el.setAttribute("fill", "black");
            curCash.pop(id);
        } else if ("black" === el.getAttribute("fill")) {
            el.setAttribute("fill", "#f72e2e");
            curCash.push(id);
        }
        localStorage.setItem(key, JSON.stringify(curCash));
    }


    render() {
        const {info} = this.props;
        const src = image + info.pkdx_id + '.png';
        return (
            <div className="card border border-dark rounded" key={info.pkdx_id} >
                <div className="card-body" id={"pokemon-" + info.pkdx_id}>
                    <img className="card-img-top border border-primary rounded-0"
                         src={IMG}
                         alt="Card image cap"/>
                    <h5 className="card-title">{info.name}</h5>
                    <div className="types-wrapper">
                        {renderTypes(info.types)}
                    </div>
                    <div className="favourite-items" onClick={this.chooseElem}>
                        {IconLove(info.pkdx_id)}
                    </div>
                </div>
            </div>
        )
    }
}

export default Post;