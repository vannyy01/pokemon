import _ from "lodash";
import React from 'react';
import IMG from '../img/Ukulele-Pichu.jpg';

function renderInfo(props) {
    const div = document.getElementsByClassName('active-el');
    if (div.length === 1) {
        let id = [];
        id[0] = parseFloat(div[0].id.substr(8));
        const selectedPoks = _.filter(
            props,
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
        const info_block = document.getElementsByClassName('post-wrapper');
        info_block[0].classList.add('mediaTop');
        return char;
    }
}

export default renderInfo;
