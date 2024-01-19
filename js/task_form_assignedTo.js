let chosenContacts = []; // Array for "Assigned to" - for all contacts which checkboxes are checked

function getAllContacts(id){
    flipTheImage(id);
    generateContactsContainer();
    displayContacts();
    putAssignedToInForeground();
    checkIfCheckboxesWereChecked();
}

/**
 * This function displays the List of all choosable Contacts
 */
function displayContacts(){
    document.getElementById('ContainerForAllPossibleContacts').classList.remove('d-none');
}

/**
 * This function put the necessary fields of "Assigned To" in foreground
 */
function putAssignedToInForeground(){
    document.getElementById('ContainerForAllPossibleContacts').setAttribute('style','z-index:999');
    document.getElementById('SubcontentContacts').setAttribute('style','z-index:999');
}

/**
 * This function closes / hides all Containers which belong to the "Assigned To" Area
 */
function closecontacts(){
    document.getElementById('assignedToSelect').value = '';
    document.getElementById('overlayContacts').classList.toggle('d-none');
    document.getElementById('ContainerForAllPossibleContacts').innerHTML = '';
    document.getElementById('ContainerForAllPossibleContacts').classList.add('d-none');
    document.getElementById('ContainerForAllChosenContacts').classList.add('d-none');
    document.getElementById('ContainerForAllChosenContacts').classList.add('d-none');
    document.getElementById('assignedToSelect').setAttribute('z-index','0');
    document.getElementById('ContainerForAllPossibleContacts').setAttribute('z-index','0');
}

/**
 * This function opens an overlay to close the current focused section by a click somewhere else
 */
function openOverlay(){
    document.getElementById('overlayContacts').classList.toggle('d-none');
}

function generatingHTMLForContactsContainer(){
    let contactsContainer = document.getElementById('ContainerForAllPossibleContacts');
    contactsContainer.innerHTML = '';
    for (let i = 0; i < contacts.length; i++){
        contactsContainer.innerHTML +=`
        <div id="contact${i}" class="contactbox contact">
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
        creatingCircle(i);
        gettingNames(i);
    }
}

function checkIfCheckboxesWereChecked(){
    for (let j = 0; j<chosenContacts.length; j++){
        let id = chosenContacts[j];
        document.getElementById(`checkbox${id}`).checked = true;
    }
}

/**
 * This function checks if the checkbox is checked or unchecked and triggers a corresponding function 
 */
function addContactToArray(i){
    let checkbox = document.getElementById(`checkbox${i}`).checked;
    if (checkbox){
        addChosenContact(i);
    }else{
        deleteChosenContact(i);
    }
}

/**
 * This function pushes the number of the contact into an Array called chosenContacts
 * @param {int} i - the position of the contact in the Json-Array
 */
function addChosenContact(i){
    chosenContacts.push(i);
}

/**
 * This function deletes the number of the contact from the Array called chosenContacts
 * @param {int} i - the position of the contact in the Json-Array
 */
function deleteChosenContact(i){
    chosenContacts.splice(chosenContacts.indexOf(i), 1);
    console.log(chosenContacts);
}

/**
 * opens the Overlay and triggers the gernerateHTMLForContactsContainer-function
 */
function generateContactsContainer(){
    openOverlay();
    generatingHTMLForContactsContainer();
}

/**
 * This function selects the first letter of the first and the last name for the displayed circle
 * @param {int} i - the position of the contact in the Json-Array
 * @returns the first letter of the first and the last name for the displayed circle
 */
function gettingInitials(i){
    let name = contacts[i]['name'];
    firstLetterName = name.toUpperCase().slice(0,1);
    firstLetterLastname = name.toUpperCase().slice(name.lastIndexOf(' ')+1,name.lastIndexOf(' ')+2);
    return {firstLetterName, firstLetterLastname};
}

/**
 * This function creates the circle at the "assigned to" Container
 * @param {int} i - the position of the contact in the Json-Array
 */
function creatingCircle(i){
    let firstLetterName = gettingInitials(i).firstLetterName;
    let firstLetterLastname = gettingInitials(i).firstLetterLastname;
    gettingInitials(i, firstLetterName, firstLetterLastname);
    let color = contacts[i]['color'];
    document.getElementById(`contactCircle${i}`).innerHTML =`
    <div id="circle${i}" class="circle">${firstLetterName}${firstLetterLastname}</div>
    `;
    colorTheCircle(i, color);
}

/**
 * This function colors the circle for the "assigned to" Container
 */
function colorTheCircle(i, color){
    document.getElementById(`circle${i}`).style = `background-color:${color}`;
}

/**
 * This function separates the Name of a person from the Json-Array and safes it in the ContactName - Container of the Person
 * @param {int} i - the position of the contact in the Json-Array
 */
function gettingNames(i){
    let name = contacts[i]['name'];
    document.getElementById(`ContactName${i}`).innerHTML +=`${name}`;
}

function filterContacts(){
    let search = document.getElementById('assignedToSelect').value;
    search = search.toLowerCase();
    let ContactList = document.getElementById('ContainerForAllPossibleContacts');
    ContactList.innerHTML = '';
    for(let i = 0; i < contacts.length; i++){
        let name = contacts[i]['name'];
        if (name.toLowerCase().includes(search)){
            ContactList.innerHTML += `
            <div id="contact${i}" class="contactbox contact">
                <div id="contactCircle${i}">

                </div>
                <div>
                    <div id="ContactName${i}" class="contactName">
                        ${contacts[i]['name']}
                    </div>
                </div>
                <div id="checkboxContainer${i}" class="checkboxContainer">
                    <input id="checkbox${i}" type="checkbox" class="checkboxes hover">
                </div>
            </div>`;
            creatingCircle(i);
        }
    }
}