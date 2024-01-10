/**
 * Starts the animation of the opening logo.
 */
function initLogIn() {
    setTimeout(function(){
        toggleClass('start-logo', 'animated-start-logo');
        fadeOutBackground();
    }, 600);
}



function fadeOutBackground() {
    let background = document.getElementById('start-logo-wrapper');
    background.style.backgroundColor = 'transparent';
    background.style.zIndex = '-1';
}