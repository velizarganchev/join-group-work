const STORAGE_TOKEN = 'DR6FZK1MTGPR11C93C73PUGXTKY05AJ4CNFZMV8P';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

let tasks = [
    {
        id: 1,
        title: 'Kochwelt Page & Recipe Recommender',
        description: 'Build start page with recipe recommendation',
        date: new Date().getTime(),
        priority: 'Medium',
        subtasks: 2,
        subtasksProgress: 0,
        category: 'User Story',
        colum: 'todo',
        contacts: [
            {
                name: 'Anton',
                lastName: 'Mayer',
                color: 'gold'
            },
            {
                name: 'Anja',
                lastName: 'Schulz',
                color: 'palevioletred'
            }
        ],
    },
    {
        id: 2,
        title: 'Kochwelt Page & Recipe Recommender',
        description: 'Build start page with recipe recommendation',
        date: new Date().getTime(),
        priority: 'Medium',
        subtasks: 4,
        subtasksProgress: 1,
        category: 'User Story',
        colum: 'in-progress',
        contacts: [
            {
                name: 'Gerd',
                lastName: 'Mayer',
                color: 'red'
            },
            {
                name: 'Maria',
                lastName: 'Schulz',
                color: 'sandybrown'
            }
        ],
    },
    {
        id: 3,
        title: 'Kochwelt Page & Recipe Recommender',
        description: 'Build start page with recipe recommendation',
        date: new Date().getTime(),
        priority: 'Medium',
        subtasks: 4,
        subtasksProgress: 3,
        category: 'User Story',
        colum: 'in-progress',
        contacts: [
            {
                name: 'Gerd',
                lastName: 'Mayer',
                color: 'red'
            },
            {
                name: 'Maria',
                lastName: 'Schulz',
                color: 'sandybrown'
            }
        ],
    },
    {
        id: 4,
        title: 'Kochwelt Page & Recipe Recommender',
        description: 'Build start page with recipe recommendation',
        date: new Date().getTime(),
        priority: 'Medium',
        subtasks: 2,
        subtasksProgress: 1,
        category: 'User Story',
        colum: 'await-feedback',
        contacts: [
            {
                name: 'Gerd',
                lastName: 'Mayer',
                color: 'red'
            },
            {
                name: 'Maria',
                lastName: 'Schulz',
                color: 'sandybrown'
            }
        ],
    }
]

/**
 * Initializing certain functions once the body of the page has fully loaded.
 * @param {string} id - Id of the current navigation item which is supposed to be highlighted.
 */
async function init(id) {
    await includeHTML();
    changeNavigationHighlight(id);
    renderTasks(tasks);
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


/**
 * Stores data in backend.
 * @param {string} key - The name which the data is saved with.
 * @param {string} value - The data which is supposed to be saved.
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) }).then(res => res.json());
}


/**
 * Fetches data from backend.
 * @param {string} key - The name which the data is saved with.
 * @returns The fethed data from backend.
 */
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(response => response.json()).then(response => response.data.value);
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