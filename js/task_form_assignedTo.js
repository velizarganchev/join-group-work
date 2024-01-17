
function getAllContacts(id){
    flipTheImage(id);
    document.getElementById('ContainerForAllPossibleContacts').classList.toggle('d-none');
    generateContactsContainer();
}

function generateContactsContainer(){
    let contactsContainer = document.getElementById('ContainerForAllPossibleContacts');
    contactsContainer.innerHTML = '';
    for (let i = 0; i < contacts.length; i++){
        generateContactsCirle(contactsContainer, i);
    }
}

function generateContactsCirle(contactsContainer, i){
    let color = contacts[i]['color'];
    let contact = contacts[i]['name'];
    let firstLetterName = contact;
    firstLetterName = firstLetterName.toUpperCase().slice(0,1);
    let firstLetterLastName = contact.toUpperCase().slice(contact.lastIndexOf(' ')+1,contact.lastIndexOf(' ')+2);
    let circle = generateCircle(i, firstLetterName, firstLetterLastName);
    generateContactsHTML(contactsContainer, i, contact, color, circle);
}

function generateCircle(i, firstLetterName, firstLetterLastName){
    return `
    <div id="circle${i}" class="circle">${firstLetterName}${firstLetterLastName}</div>
    `;
}

function generateContactsHTML(contactsContainer, i, contact, color, circle){
    contactsContainer.innerHTML += `
    <div class="ContentContacts">
        <div id="contactCircle${i}" class="contact hover">
            ${circle}
            <div>${contact}</div>
        </div>
        <div id="checkbox">
            <input type="checkbox" id="checkboxFor${i}" class="checkboxes hover" onclick="safeContact(${i})">
        </div>
    </div>`;
    document.getElementById(`circle${i}`).style = `background-color:${color}`;
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
                <div class="ContentContacts">
                    <div id="contactCircle${i}" class="contact hover">
                        Kreis
                        <div>${contacts[i]['name']}</div>
                    </div>
                    <div id="checkbox">
                        <input type="checkbox" id="checkboxFor${i}" class="checkboxes hover" onclick="safeContact(${i})">
                    </div>
                </div>`;
        }
    }
}

// let chosenContactsForTask = [];
// function safeContact(id){
//     let checkbox = document.getElementById(`checkboxFor${id}`).checked;
//     let chosenContact = document.getElementById('ContainerForAllChosenContacts');
//     if(checkbox){
//         addChosenContact(id, chosenContact);
//     }else{
//         deletechosenContact(id, chosenContact);
//     }
// }

// function addChosenContact(id, chosenContact){
//     if(chosenContactsForTask.includes(id)){

//     }
//     else{
//         chosenContactsForTask.push(id);
//         chosenContact.innerHTML = '';
//         for(let j = 0; j < chosenContactsForTask.length; j++){
//             chosenContact.innerHTML += chosenContactsForTask[j];
//         }
//     }
// }

// function deletechosenContact(id, chosenContact){
//     chosenContactsForTask.splice(id,1);
//     chosenContact.innerHTML = '';
//     for(let j = 0; j < chosenContactsForTask.length; j++){
//         chosenContact.innerHTML += chosenContactsForTask[j];
//     }
// }