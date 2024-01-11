/**
 * Starts the animation of the opening logo.
 */
function initLogIn() {
    animateStartLogo();
    // renderLogIn();
}


/**
 * Animates the big Join logo at the start of the log in page.
 */
function animateStartLogo() {
    setTimeout(function(){
        toggleClass('start-logo', 'animated-start-logo');
        toggleClass('form-wrapper', 'fade-in-content')
    }, 600);
}


/**
 * Renders the form for logging in.
 */
function renderLogIn() {
    let logInWrapper = document.getElementById('form-wrapper');
    logInWrapper.innerHTML = logInFormTemplate();
}



function logInFormTemplate() {
    return /*html*/`
        
    `;
}