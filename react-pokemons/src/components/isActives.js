import React from 'react';

function isActiveElement() {
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

function isActiveHeart() {
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

export {isActiveElement ,isActiveHeart};