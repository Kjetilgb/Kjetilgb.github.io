function init(){
    let ass3 = document.getElementById('ass3');
    let ass4 = document.getElementById('ass4');
    let ass8 = document.getElementById('ass8');
    let ass9 = document.getElementById('ass9');

    let body = document.body;


    ass3.onmouseover = function() {
        // body.style = 'background: #70E2FF';
        // ass3.style = 'color: crimson';
    }
    
    ass3.onmouseleave = function() {
        body.style = 'background: #70E2FF'
        ass3.style = 'color: white';
    }
}

window.onload = init;