/**
 * Initializes certain functions once the body of the page has fully loaded.
 */
async function initSummary() {
    checkLogInStatus();
    await init('summary');
    renderWelcomeMessage();
}

/**
 * Renders the welcome message on the summary page, depending on the time.
 */
function renderWelcomeMessage() {
    let welcomeMessage = document.getElementById('welcome-message');
    let usernameWrapper = document.getElementById('username-wrapper');
    let username = getCurrentUsername();
    let time = new Date().getHours()
    if (time < 10) {
        welcomeMessage.innerHTML = 'Good morning,';
        usernameWrapper.innerHTML = username;
    }
    if (time >= 10 && time < 14) {
        welcomeMessage.innerHTML = 'Good day,';
        usernameWrapper.innerHTML = username;
    }
    if (time >= 14 && time <18) {
        welcomeMessage.innerHTML = 'Good afternoon,';
        usernameWrapper.innerHTML = username;
    }
    if (time >= 18) {
        welcomeMessage.innerHTML = 'Good evening,';
        usernameWrapper.innerHTML = username;
    }
}