let chosenContacts = []; // Array for "Assigned to" - for all contacts which checkboxes are checked
let chosenContactsJson = [];

/**
 * This function opens a dropdown-menu so that the user can select a contact, which should work at the task in the future
 * @param {string} id - id of the Element which should be flipped around 
 */
function getAllContacts() {
    flipTheImage();
    displayContacts();
    generateContactsContainer();
    putAssignedToInForeground();
    checkIfCheckboxesWereChecked();
    checkScreenWidth();
}

/**
 * This function checks the screenwidth and adds margin to the Top of Content2 (right Content Container) if necessary
 */
function checkScreenWidth(){
    if (document.body.clientWidth <= 1400){
        if(chosenContacts.length != 0 && !document.getElementById('ContainerForAllPossibleContacts').classList.contains('d-none')){
            document.getElementById('Content2').style.marginTop = "230px";
        }else if (chosenContacts.length === 0 && !document.getElementById('ContainerForAllPossibleContacts').classList.contains('d-none')) {
            document.getElementById('Content2').style.marginTop = "230px";
        } else if (chosenContacts.length != 0 && document.getElementById('ContainerForAllPossibleContacts').classList.contains('d-none')) {
            document.getElementById('Content2').style.marginTop = "20px";
        } else {
            document.getElementById('Content2').style.marginTop = "0px";
        }
    }else{
        document.getElementById('Content2').style.marginTop = "0px";
    }
}

/**
 * This function turns the arrow-image of the assignedTo-Section upside down
 */
function flipTheImage(){
    document.getElementById('assignedToImg').src="/assets/img/arrow_down.png";
}

/**
 * This function displays the List of all choosable Contacts
 */
function displayContacts() {
    document.getElementById('ContainerForAllPossibleContacts').classList.remove('d-none');
}

/**
 * This function put the necessary fields of "Assigned To" in foreground
 */
function putAssignedToInForeground() {
    document.getElementById('ContainerForAllPossibleContacts').setAttribute('style', 'z-index:999');
    document.getElementById('SubcontentContacts').setAttribute('style', 'z-index:999');
}

/**
 * This function closes / hides all Containers which belong to the "Assigned To" Area
 */
function closecontacts() {
    document.getElementById('assignedToSelect').value = '';
    document.getElementById('overlayContacts').classList.toggle('d-none');
    document.getElementById('assignedToImg').src="/assets/img/arrow_up.png"
    document.getElementById('ContainerForAllPossibleContacts').innerHTML = '';
    document.getElementById('ContainerForAllPossibleContacts').classList.add('d-none');
    if (chosenContacts.length == 0) {
        document.getElementById('ContainerForAllChosenContacts').classList.add('d-none');
    }
    document.getElementById('assignedToSelect').setAttribute('z-index', '0');
    document.getElementById('ContainerForAllPossibleContacts').setAttribute('z-index', '0');
    checkScreenWidth();
}

/**
 * This function opens an overlay to close the current focused section by a click somewhere else
 */
function openOverlay() {
    document.getElementById('overlayContacts').classList.toggle('d-none');
}

/**
 * This function generates the HTML-Container for every contact and fills it with information
 */
function generatingHTMLForContactsContainer() {
    let contactsContainer = document.getElementById('ContainerForAllPossibleContacts');
    contactsContainer.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        let adress = `contactCircle${i}`;
        contactsContainer.innerHTML += `
        <div id="contact${i}" class="contactbox contact" onclick="checkCheckbox(${i})">
            <div id="contactCircle${i}">

            </div>
            <div>
                <div id="ContactName${i}" class="contactName">

                </div>
            </div>
            <div id="checkboxContainer${i}" class="checkboxContainer">
                <input id="checkbox${i}" type="checkbox" class="checkboxes hover" onclick="addContactToArray(${i})">
            </div>
        </div>`;
        creatingCircle(i, adress);
        gettingNames(i);
    }
}

/**
 * This function check / uncheck the checkbox of the chosen contact
 * @param {int} i - number of the checkbox
 */
function checkCheckbox(i){
    document.getElementById(`checkbox${i}`).checked = !document.getElementById(`checkbox${i}`).checked;
    let checkbox = document.getElementById(`checkbox${i}`).checked;
    if (checkbox) {
        addChosenContact(i);
    } else {
        deleteChosenContact(i);
    }
}

/**
 * This function checks, if a checkbox was checked, if so it will be checked after reopening the dropdown-menu
 */
function checkIfCheckboxesWereChecked() {
    for (let j = 0; j < chosenContacts.length; j++) {
        let id = chosenContacts[j];
        document.getElementById(`checkbox${id}`).checked = true;
    }
}

/**
 * This function checks if the checkbox is checked or unchecked and triggers a corresponding function 
 */
function addContactToArray(i) {
    let checkbox = document.getElementById(`checkbox${i}`).checked;
    if (checkbox) {
        addChosenContact(i);
    } else {
        deleteChosenContact(i);
    }
    event.stopPropagation();
}

/**
 * This function pushes the number of the contact into an Array called chosenContacts
 * @param {int} i - the position of the contact in the Json-Array
 */
function addChosenContact(i) {
    let name = contacts[i]['name'];
    let firstname = name.slice(0, name.lastIndexOf(' '));
    let lastname = name.slice(name.lastIndexOf(' ') + 1,);
    let color = contacts[i]['color'];
    let contactsJSON = {
        'firstname': firstname,
        'lastname': lastname,
        'color': color
    };
    chosenContactsJson.push(contactsJSON);
    chosenContacts.push(i);
    createCirclesToChosenContactContainer();
}

/**
 * This function deletes the number of the contact from the Array called chosenContacts
 * @param {int} i - the position of the contact in the Json-Array
 */
function deleteChosenContact(i) {
    chosenContacts.splice(chosenContacts.indexOf(i), 1);
    createCirclesToChosenContactContainer();
}

/**
 * This function creates the circles with the initials under the inputs after a contact was chosen
 */
function createCirclesToChosenContactContainer() {
    let adress = 'ContainerForAllChosenContacts';
    let Content = document.getElementById(`${adress}`);
    Content.innerHTML = '';
    for (let j = 0; j < chosenContacts.length; j++) {
        let id = chosenContacts[j];
        creatingCircle(id, adress);
    }
    displaydiv();
}

/**
 * This Function displays the chosenContacts div, if min. one Contact is currently chosen
 */
function displaydiv(){
    if (chosenContacts.length == 0){
        document.getElementById('ContainerForAllChosenContacts').classList.add('d-none'); 
    }else{
        document.getElementById('ContainerForAllChosenContacts').classList.remove('d-none');
    }
}

/**
 * opens the Overlay and triggers the gernerateHTMLForContactsContainer-function
 */
function generateContactsContainer() {
    openOverlay();
    generatingHTMLForContactsContainer();
}

/**
 * This function selects the first letter of the first and the last name for the displayed circle
 * @param {int} i - the position of the contact in the Json-Array
 * @returns the first letter of the first and the last name for the displayed circle
 */
function gettingInitials(i) {
    let name = contacts[i]['name'];
    firstLetterName = name.toUpperCase().slice(0, 1);
    firstLetterLastname = name.toUpperCase().slice(name.lastIndexOf(' ') + 1, name.lastIndexOf(' ') + 2);
    return { firstLetterName, firstLetterLastname };
}

/**
 * This function creates the circle at the "assigned to" Container
 * @param {int} i - the position of the contact in the Json-Array
 * @param {string} adress - carries the information about the id, where the Circle should be displayed
 */
function creatingCircle(i, adress) {
    let firstLetterName = gettingInitials(i).firstLetterName;
    let firstLetterLastname = gettingInitials(i).firstLetterLastname;
    let color = contacts[i]['color'];
    document.getElementById(`${adress}`).innerHTML += `
    <div id="circle${i}" class="circle" style="background-color:${color}">${firstLetterName}${firstLetterLastname}</div>
    `;
}

/**
 * This function separates the Name of a person from the Json-Array and safes it in the ContactName - Container of the Person
 * @param {int} i - the position of the contact in the Json-Array
 */
function gettingNames(i) {
    let name = contacts[i]['name'];
    document.getElementById(`ContactName${i}`).innerHTML += `${name}`;
}

/**
 * This function let the user search for a contact in the Assigned To input-field by typing in the searched name
 */
function filterContacts() {
    let search = document.getElementById('assignedToSelect').value;
    search = search.toLowerCase();
    let ContactList = document.getElementById('ContainerForAllPossibleContacts');
    ContactList.innerHTML = '';
    HtmlForFilter(search, ContactList);
}

/**
 * This function generates the HTML for the filter-function
 * @param {string} search - The name the user wants to search for
 * @param {HTML} ContactList - List of names that contain the searched character string
 */
function HtmlForFilter(search, ContactList){
    for (let i = 0; i < contacts.length; i++) {
        let adress = `contactCircle${i}`;
        let name = contacts[i]['name'];
        if (name.toLowerCase().includes(search)) {
            ContactList.innerHTML += `
            <div id="contact${i}" class="contactbox contact" onclick="checkCheckbox(${i})">
                <div id="contactCircle${i}">
                </div>
                <div>
                    <div id="ContactName${i}" class="contactName">
                        ${contacts[i]['name']}
                    </div>
                </div>
                <div id="checkboxContainer${i}" class="checkboxContainer">
                    <input id="checkbox${i}" type="checkbox" class="checkboxes hover" onclick="addContactToArray(${i})">
                </div>
            </div>`;
            creatingCircle(i, adress);
        }
    }
}