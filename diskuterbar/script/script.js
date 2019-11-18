
window.addEventListener('hashchange', function(){
   let hash = window.location.hash;
   let menu = document.getElementsByClassName('innerSidebarMenu')[0];

   for(let i = 0; i < menu.children.length; i++) {
       if(menu.children[i].firstElementChild.hash === hash){
           menu.children[i].firstElementChild.style = "color: #F48320";
       } else {
           menu.children[i].firstElementChild.style = "color: white";
       }
   }
});

// Set active link color with scrolling
// window.onscroll = function() {
//     let pos = window.scrollY;
//     let screenH = window.screen.availHeight;
//     if(pos - 40 < 640 && pos > 0){
//         console.log("Hjem");
//         removeActive('')
//     } else if (pos < (pos * 2) && pos > screenH) {
//         console.log("Events");
//         removeActive('#arrang')
//     }
// };
