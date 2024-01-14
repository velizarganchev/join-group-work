let currentchosenPrio; // needed in function "changeItoPrioInString" to see which Prio was chosen
let allTasks = [];

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
        'subtask': subtask,
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
    let contactsContainer = document.getElementById('ContainerForAllPossibleContacts');
    contactsContainer.innerHTML = '';
    for (let i = 0; i < contacts.length; i++){
        let color = contacts[i]['color'];
        let contact = contacts[i]['name'];
        let firstLetterName = contact;
        firstLetterName = firstLetterName.toUpperCase().slice(0,1);
        let firstLetterLastName = contact.toUpperCase().slice(contact.lastIndexOf(' ')+1,contact.lastIndexOf(' ')+2);
        contactsContainer.innerHTML += `
        <div class="ContentContacts">
            <div class="contact hover">
                <div id="circle${i}" class="circle">${firstLetterName}${firstLetterLastName}</div>
                <div>${contact}</div>
            </div>
            <div id="checkbox">
                <input type="checkbox" id="checkboxFor${i}" class="checkboxes">
            </div>
        </div>`;
        document.getElementById(`circle${i}`).style = `background-color:${color}`;
    }
}

function getAllCategories(id){
    flipTheImage(id);
}