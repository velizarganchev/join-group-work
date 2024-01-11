/**
 * Starts the animation of the opening logo.
 */
function initLogIn() {
    animateStartLogo();
    renderLogIn();
}


/**
 * Animates the big Join logo at the start of the log in page.
 */
function animateStartLogo() {
    setTimeout(function(){
        toggleClass('start-logo', 'animated-start-logo');
        fadeOutBackground();
    }, 600);
}


/**
 * Fades out the background of the big Join logo while it's animation.
 */
function fadeOutBackground() {
    let background = document.getElementById('start-logo-wrapper');
    background.style.backgroundColor = 'transparent';
    background.style.zIndex = '-1';
}


/**
 * Renders the form for logging in.
 */
// function renderLogIn() {
//     let logInWrapper = document.getElementById('form-wrapper');
//     logInWrapper.innerHTML = logInFormTemplate();
// }



function logInFormTemplate() {
    return /*html*/`
        
    `;
}