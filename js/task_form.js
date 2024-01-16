let currentchosenPrio; // needed in function "changeItoPrioInString" to see which Prio was chosen
let allTasks = [];
let allSubtasks = [];

/**
 * Initializes certain functions once the body of the page has fully loaded.
 */
async function initAddTask() {
    checkLogInStatus();
    await init('add-task');
}



/** changes the HTML back to standard (=no Prio chosen)
 * 
 */
function resetPrio(){
    document.getElementById('SubcontentPrio').innerHTML = `
        <div id="Prio1" class="prioclass hover" onclick="choosePrio(1)">
            <div>Urgent</div>
            <img id="HighImg" src="/assets/img/PrioHigh.png">
        </div>
        <div id="Prio2" class="prioclass hover" onclick="choosePrio(2)">
            <div>Medium</div>
            <img id="MediumImg" src="/assets/img/PrioMedium.png">
        </div>
        <div id="Prio3" class="prioclass hover" onclick="choosePrio(3)">
            <div>Low</div>
            <img id="LowImg" src="/assets/img/PrioLow.png">
        </div>
    `;
}

/**
 * 
 * @param {string} Prio - changes the given number i to a Prioity in string-form
 * @param {int} i - gives the function the Prio in int (1 = Urgent / 2 = Medium / 3 = Low Priority)
 * @param {int} currentchosenPrio - safe the current chosen Priority in int (like above)
 */
function changeItoPrioInString(Prio, i){
    if (currentchosenPrio == i){
        currentchosenPrio = '';
    }else{
        if (i == 1){
            Prio = 'High';
        }else if(i == 2){
            Prio = 'Medium';
        }else {
            Prio = 'Low';
        }
        currentchosenPrio = i;
        changeColorOfPrio(Prio, i);
    }
}

/** Reset the HTML and changes the color and the image for the chosen Prio
 * 
 * @param {int} i - gives the function the Prio in int (1 = Urgent / 2 = Medium / 3 = Low Priority)
 */
function choosePrio(i){
    resetPrio();
    let Prio;
    changeItoPrioInString(Prio, i);
}

/** changes the img for the chosen Prio
 * 
 * @param {string} Prio - safes the chosen Priority in string-form
 */
function changeImgOfPrio(Prio){
    let img2 = `/assets/img/Prio${Prio}White.png`;
    document.getElementById(`${Prio}Img`).src = img2;
}

/**changes the backgroundcolor of the Prio-div
 * 
 * @param {string} Prio - changes the given number i to a Prioity in string-form
 * @param {int} i - gives the function the Prio in int (1 = Urgent / 2 = Medium / 3 = Low Priority)
 */
function changeColorOfPrio(Prio, i){
    document.getElementById(`Prio${i}`).classList.toggle(`${Prio}chosen`);
    changeImgOfPrio(Prio);
}

function activateAndDeactivateSubtaskInput(){
    let task = document.getElementById('subtask').value
    if (document.activeElement == task){
        document.getElementById('+').classList.remove('d-none');
        document.getElementById('cancel').classList.add('d-none');
        document.getElementById('verticalLine').classList.add('d-none');
        document.getElementById('hook').classList.add('d-none'); 
    }else {
        document.getElementById('+').classList.add('d-none');
        document.getElementById('cancel').classList.remove('d-none');
        document.getElementById('verticalLine').classList.remove('d-none');
        document.getElementById('hook').classList.remove('d-none');
    }
}

function cancelSubtask(){
    document.getElementById('subtask').value = '';
}

function addSubtask(){
    let task = document.getElementById('subtask').value;
    document.getElementById('subTaskList').innerHTML += `<li>${task}</li>`;
    allSubtasks.push(task);
    activateAndDeactivateSubtaskInput();
    cancelSubtask();
}


/**
 * collects the values of all inputs
 */
function getAllInputs(){ // Json auslagern -> funktioniert nicht..
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let assignedTo = document.getElementById('assignedToSelect').value;
    let date = document.getElementById('date').value;
    let prio = currentchosenPrio;
    let category = document.getElementById('category').value;
    let subtask = document.getElementById('subtask').value;
    const task = {
        'title': title,
        'description': description,
        'assigned': assignedTo,
        'date': date,
        'prio': prio,
        'category': category,
        'subtask': allSubtasks,
        token: STORAGE_TOKEN
    }
    creatingJson(task);
    clearForm();
    confirmTheCreationOfATask();   
}

/**
 * safes the Json in an Array called "allTasks"
 * @param {Json} task - contains the safed Json
 */
function creatingJson(task){
    allTasks.push(task);
    // safeAllTasksToStorage('AllTasks',allTasks);
}


//löschen und aus script.js ziehen
/**
 * safes the JsonArray in the backend
 * @param {string} key - the key of the safed data
 * @param {Json} value - the safed value as Json
 * @returns 
 */
async function safeAllTasksToStorage(key, value){
    const payload = {key, value, token: STORAGE_TOKEN};
    return fetch(STORAGE_URL, {method:'POST', body: JSON.stringify(payload)});
}
// Kannst du bitte das Item so speichern!!!
// {
//     id: 1,
//     title: 'Kochwelt Page & Recipe Recommender',
//     description: 'Build start page with recipe recommendation',
//     date: new Date().getTime(),
//     priority: 'Medium',
//     subtasks: [
//         {
//             name: 'Implement Recipe Recommendation',
//             done: false
//         },
//         {
//             name: 'Start Page Layout',
//             done: false
//         },
//         {
//             name: 'Start Page Layout',
//             done: false
//         }
//     ],
//     subtasksProgress: 1,
//     category: 'User Story',
//     colum: 'todo',
//     contacts: [
//         {
//             name: 'Anton',
//             lastName: 'Mayer',
//             color: 'gold'
//         },
//         {
//             name: 'Anja',
//             lastName: 'Schulz',
//             color: 'palevioletred'
//         }
//     ],
// }

/**
 * empties all input-fields
 */
function clearForm(){
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('assignedToSelect').value = '';;
    document.getElementById('date').value = '';
    document.getElementById('category').value = '';
    document.getElementById('subtask').value = '';
    resetPrio();
}

/**
 * This function creates an overlay for confirmation that a task was created successfully
 */
function confirmTheCreationOfATask(){
    document.getElementById('Content').innerHTML += `
    <div id="confirmationContent" class="confirmationContent">
        <div class="fly-in">
            <h1 class="addTaskHeadline">The task was created successfully!</h1>
        </div>
        <button type="button" class="createTaskButton hover" onclick="addAnotherTask()">add another task</button>
        <br>
        <button type="button" class="createTaskButton hover" onclick="backToBoard()">back to board</button>
    </div>
    `;
}

/**
 * leads the user to board.html
 */
function backToBoard(){
    location.href="board.html";
}

/**
 * leads the user to "add_task.html"
 */
function addAnotherTask(){
    location.href="add_task.html";
}

function flipTheImage(id){
    document.getElementById(`${id}`).classList.toggle('arrowdown');
    document.getElementById(`${id}`).classList.toggle('arrowup');
}

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

function generateCircle(i, firstLetterName, firstLetterLastName){
    return `
    <div id="circle${i}" class="circle">${firstLetterName}${firstLetterLastName}</div>
    `;
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

function checkBoxesAtSecondOpening(){

}

function getAllCategories(id){
    flipTheImage(id);
}