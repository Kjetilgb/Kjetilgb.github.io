/* ================================================================= */
/* Quick hack for switching a CSS file by mouse click. (C) DJ 8/2012 */
/* - Changed names and added local storage to ensure last CSS chosen */
/* is active when page reloads. Changes (C) Kine Bergseth 9/2018 */
/* - Simplified syntax, removed redundant file call. (C) DJ 10/2019 */
/* - Changed localStorage to allow multiple projects. (C) DJ 11/2019 */
/* ================================================================= */

let currURL = document.location.href;
let stylesheet = document.getElementById("stylesheet");

function switchCSS(first, second) {
    let href = stylesheet.getAttribute("href");
    let newHref = href === first ? second : first;
    // This if/else statement is of my own making.
    if (href === second){
        for(let i = 0; i < document.getElementsByClassName('picture-box').length; i++) {
            document.getElementsByClassName('picture-box')[i].classList.add('un-blur');
            document.getElementsByClassName('picture-box')[i].classList.remove('blur');
        }
        document.getElementsByClassName('reverse-picture-box')[0].classList.remove('un-blur');
        document.getElementsByClassName('reverse-picture-box')[0].classList.add('blur');
    } else {
        for(let i = 0; i < document.getElementsByClassName('picture-box').length; i++){
            document.getElementsByClassName('picture-box')[i].classList.add('blur');
            document.getElementsByClassName('picture-box')[i].classList.remove('un-blur');
        }
        document.getElementsByClassName('reverse-picture-box')[0].classList.remove('blur');
        document.getElementsByClassName('reverse-picture-box')[0].classList.add('un-blur');
    }
    localStorage.setItem(currURL, newHref);
    stylesheet.setAttribute("href", newHref);
}

document.addEventListener("DOMContentLoaded", function() {
    let stored_css = localStorage.getItem(currURL);
    if (!(typeof stored_css === 'undefined' || stored_css === null)) {
        stylesheet.href = stored_css;
    }
});
/* ================================================================= */