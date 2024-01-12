/**
 * Starts the animation of the opening logo.
 */
function initLogIn() {
    animateStartLogo();
    renderLogIn();
    checkIfEmpty();
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
    let dynamicContent = document.getElementById('dynamic-content');
    dynamicContent.innerHTML = logInFormTemplate();
}


/**
 * HTML template for better readability.
 * @returns HTML template of the log in form.
 */
function logInFormTemplate() {
    return /*html*/`
        <div class="sign-up-wrapper">
            <span>Not a Join user?</span>
            <button class="dark-button" onclick="renderSignUp()">Sign up</button>
        </div>
        <div id="form-wrapper">
            <div class="log-in-box">
                <h1>Log in</h1>
                <div class="headline-border"></div>
                <form id="log-in-form" onsubmit="logIn(); return false;">
                    <div class="input-wrapper">
                        <input type="email" id="email" required placeholder="Email" autofocus>
                        <img id="email-image" src="/assets/img/email-icon.png">
                    </div>
                    <div class="input-wrapper">
                        <input type="password" id="password" required placeholder="Password" oninput="checkIfEmpty('password', 'password-image')">
                        <img id="password-image" src="/assets/img/password-icon.png" onclick="togglePasswordVisibility('password', 'password-image')">
                    </div>
                    <div class="remember-me-box">
                        <input type="checkbox" id="remember-me">
                        <span>Remember me</span>
                    </div>
                    <div class="entry-buttons">
                        <button class="dark-button" type="submit">Log in</button>
                        <button class="light-button" onclick="setUpGuestLogIn()">Guest Log in</button>
                    </div>
                </form>
            </div>
        </div>
    `;
}


/**
 * Checks if input field for password is empty.
 */
function checkIfEmpty(inputId, imageId) {
    let passwordInput = document.getElementById(inputId);
    let passwordImage = document.getElementById(imageId);
    if (passwordInput.value !== '') {
        changeImageSource(imageId, '/assets/img/password-hidden.png');
        passwordImage.style.pointerEvents = 'all';
        passwordImage.style.cursor = 'pointer';
    } else {
        changeImageSource(imageId, '/assets/img/password-icon.png');
        passwordImage.style.pointerEvents = 'none';
        passwordInput.type = 'password';
    }
}


/**
 * Toggles visibility of password in its input field.
 * @param {string} id - The input field's id.
 */
function togglePasswordVisibility(inputId, imageId) {
    let passwordInput = document.getElementById(inputId);
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        changeImageSource(imageId, '/assets/img/password-shown.png');
        passwordInput.focus();
    } else {
        passwordInput.type = 'password';
        changeImageSource(imageId, '/assets/img/password-hidden.png');
    }
}


/**
 * Desides whether or not to fetch user information depending if a log in or a guest log in occured.
 */
function logIn() {
    if (checkValidation() === true) {
        /*fetch user information*/
        window.location.href = 'summary.html'
    } else {
        window.location.href = 'summary.html'
    }
}


/**
 * Sets up log in for guest user by disabling the form validation.
 */
function setUpGuestLogIn() {
    let logInForm = document.getElementById('log-in-form');
    let emailInput = document.getElementById('email');
    let passwordInput = document.getElementById('password');
    emailInput.removeAttribute('required');
    passwordInput.removeAttribute('required');
    logInForm.submit();
}


/**
 * Checks whether or not the form validtion is on.
 * @returns True if form validation is on and false if form validation is off.
 */
function checkValidation() {
    let emailInput = document.getElementById('email');
    let passwordInput = document.getElementById('password');
    if (emailInput.hasAttribute('required') === true && passwordInput.hasAttribute('required') === true) {
        return true
    } else {
        return false
    }
}


/**
 * Renders the form for signing up.
 */
function renderSignUp() {
    let dynamicContent = document.getElementById('dynamic-content');
    dynamicContent.innerHTML = signUpFormTemplate();
}


/**
 * HTML template for better readability.
 * @returns HTML template of the sign up form.
 */
function signUpFormTemplate() {
    return/*html*/`
        <div id="form-wrapper">
            <div class="sign-up-box">
                <button class="arrow-left scale-on-hover" onclick="renderLogIn()"><img src="/assets/img/arrow-left-line.png"></button>
                <h1>Sign up</h1>
                <div class="headline-border"></div>
                <form id="sign-up-form" onsubmit="logIn(); return false;">
                    <div class="input-wrapper">
                        <input type="text" id="name" required placeholder="Name" autofocus>
                        <img id="email-image" src="/assets/img/name-icon.png">
                    </div>
                    <div class="input-wrapper">
                    <input type="email" id="email" required placeholder="Email">
                        <img id="email-image" src="/assets/img/email-icon.png">
                    </div>
                    <div class="input-wrapper">
                        <input type="password" id="password" required placeholder="Password" oninput="checkIfEmpty('password', 'password-image')">
                        <img id="password-image" src="/assets/img/password-icon.png" onclick="togglePasswordVisibility('password', 'password-image')">
                    </div>
                    <div class="input-wrapper">
                        <input type="password" id="confirm-password" required placeholder="Confirm password" oninput="checkIfEmpty('confirm-password', 'confirm-password-image')">
                        <img id="confirm-password-image" src="/assets/img/password-icon.png" onclick="togglePasswordVisibility('confirm-password', 'confirm-password-image')">
                    </div>
                    <div class="privacy-policy-box">
                        <input type="checkbox" id="privacy-policy-checkbox" required>
                        <span>I accept the</span>
                        <a class="scale-on-hover" href="privacy_policy.html">Privacy Policy</a>
                    </div>
                    <div class="entry-buttons">
                        <button class="dark-button" type="submit">Sign up</button>
                    </div>
                </form>
            </div>
        </div>
    `;
}