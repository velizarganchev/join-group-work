const BASE_URL = 'https://join.velizar-ganchev-backend.com/api/';

let allTasks = [];
let column = '';
let allSubtasks = [];


/**
 * Initializes certain functions once the body of the page has fully loaded.
 * @param {string} id - Id of the current navigation item which is supposed to be highlighted.
 */
async function init(id) {
    await loadTasks();
    await includeHTML();
    checkLogInStatus();
    changeNavigationHighlight(id);
    lockScreenOrientation();
}


/**
 * Renders dynamic content in into the static html structures.
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


async function getData(key) {
    let currUser = getCurrentUser();

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Token ${currUser.token}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
    };

    const url = `${BASE_URL}${key}/`;
    try {
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

async function createData(endpoint, data) {
    let currUser = getCurrentUser();

    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Token ${currUser.token}`);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(data),
    };

    const url = `${BASE_URL}${endpoint}/`;
    try {
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

async function updateData(endpoint, id, data) {
    let currUser = getCurrentUser();

    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Token ${currUser.token}`);

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(data),
    };

    const url = `${BASE_URL}${endpoint}/${id}/`;
    try {
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

async function deleteData(endpoint, id) {
    let currUser = getCurrentUser();

    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Token ${currUser.token}`);

    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
    };

    const url = `${BASE_URL}${endpoint}/${id}/`;
    try {
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return response;
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

async function deleteUserProfile(endpoint, token) {
    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Token ${token}`);

    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
    };

    const url = `${BASE_URL}${endpoint}/`;
    try {
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return response;
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

async function loginRegisterUser(endpoint, data) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(data),
    };

    const url = `${BASE_URL}${endpoint}/`;
    try {
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
    }
}


/**
 * Toggles a class.
 * @param {string} id - The id of the element which contains the class.
 * @param {string} classname - The name of the class to be toggled.
 */
function toggleClass(id, classname) {
    document.getElementById(id).classList.toggle(classname);
}


/**
 * Changes the highlighted navigation element, depending on which site you are on.
 * @param {string} id - The id of the navigation element to be highlighted.
 */
function changeNavigationHighlight(id) {
    let highlighted = document.querySelector('.active');
    highlighted.classList.remove('active');
    let newHighlighted = document.getElementById(id);
    checkIfOnHelpSite(id, newHighlighted)
}


/**
 * Checks wheter or not the help page is open.
 * @param {string} id - The id of the navigation element to be highlighted.
 * @param {element} newHighlighted - The navigation element to be highlighted.
 */
function checkIfOnHelpSite(id, newHighlighted) {
    if (newHighlighted.firstElementChild.src !== `${getProtocol()}//${getHost()}/assets/img/question-mark-icon.png`) {
        newHighlighted.classList.add('active');
        newHighlighted.firstElementChild.src = `${getProtocol()}//${getHost()}/assets/img/${id}-icon-white.png`;
    }
}


/**
 * Identifies the protocol method of the current site.
 * @returns The protocol method as a string.
 */
function getProtocol() {
    let protocol = window.location.protocol;
    return protocol;
}


/**
 * Identifies the host of the current site.
 * @returns The host as a string.
 */
function getHost() {
    let host = window.location.host;
    return host;
}


/**
 * Changes the url of a given image.
 * @param {string} id 
 * @param {string} url 
 */
function changeImageSource(id, url) {
    let image = document.getElementById(id);
    image.src = url;
}


/**
 * Loggs out the current user.
 */
async function logOut() {
    let guest = getCurrentUser();
    if (guest.username === 'guest') {
        await deleteUserProfile('contacts', guest.token)
    }

    toggleClass('profile-nav-wrapper', 'hide');
    setCurrentUser('');
    window.location.replace = 'index.html'
}


/**
 * Redirects user to log in page to prevent unauthorized users to see protected information such as board.html for example.
 */
function checkLogInStatus() {
    if (logInCnodition()) {
        toggleClass('summary', 'hide');
        toggleClass('add-task', 'hide');
        toggleClass('board', 'hide');
        toggleClass('contacts', 'hide');
    } else if (getCurrentUser() === '' || getCurrentUser() === undefined) {
        window.location.replace('index.html');
    }
}


/**
 * Sets the current user in the session storage.
 * @param {string} user - The currently loggin in user's username.
 */
function setCurrentUser(user) {
    sessionStorage.setItem('user', JSON.stringify(user));
}


/**
 * Gets the current user from session storage.
 * @returns Item with the key "user" from session storage.
 */
function getCurrentUser() {
    let currentUser = sessionStorage.getItem('user');
    return JSON.parse(currentUser);
}


/**
 * Loads the saved tasks from the backend.
 */
async function loadTasks() {
    allTasks = await getData('tasks');
}

/**
 * Locks the screen orientation depending on which device the user is using.
 */
function lockScreenOrientation() {
    if (window.innerWidth <= 700) {
        screen.orientation.lock('portrait');
    }
}

function logInCnodition() {
    return getCurrentUser() === '' && window.location.pathname === '/html/legal_notice.html' ||
        getCurrentUser() === '' && window.location.pathname === '/html/privacy_policy.html' ||
        getCurrentUser() === undefined && window.location.pathname === '/html/legal_notice.html' ||
        getCurrentUser() === undefined && window.location.pathname === '/html/privacy_policy.html';
}