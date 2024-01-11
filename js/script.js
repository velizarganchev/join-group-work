const STORAGE_TOKEN = 'DR6FZK1MTGPR11C93C73PUGXTKY05AJ4CNFZMV8P';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


/**
 * Initializing certain functions once the body of the page has fully loaded.
 * @param {string} id - Id of the current navigation item which is supposed to be highlighted.
 */
async function init(id) {
    await includeHTML();
    changeNavigationHighlight(id);
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