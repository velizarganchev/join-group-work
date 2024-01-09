const STORAGE_TOKEN = 'DR6FZK1MTGPR11C93C73PUGXTKY05AJ4CNFZMV8P';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

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