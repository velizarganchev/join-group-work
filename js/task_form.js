let currentchosenPrio; // needed in function "changeItoPrioInString" to see which Prio was chosen
let subtasks = [];
/**
 * Initializes certain functions once the body of the page has fully loaded.
 */
async function initAddTask() {
    checkLogInStatus();
    await init('add-task');
    minDate();
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

/**
 * This function toggles the Images from the Subtask Input
 */
function activateAndDeactivateSubtaskInput(){
    // document.getElementById('subTaskList').classList.toggle('d-none');
    document.getElementById('plus').classList.toggle('d-none'); //toggleClass('+', 'd-none');
    document.getElementById('cancel').classList.toggle('d-none'); //toggleClass('cancel', 'd-none');
    document.getElementById('verticalLine').classList.toggle('d-none'); //toggleClass('verticalLine', 'd-none');
    document.getElementById('hook').classList.toggle('d-none'); //toggleClass('hook', 'd-none');
    document.getElementById('overlay').classList.toggle('d-none'); //toggleClass('overlay', 'd-none');
    cancelSubtask();
}

/**
 * This function clears the Subtasks Input
 */
function cancelSubtask(){
    document.getElementById('subtask').value = '';
}

/**
 * This function adds a new subtask to the Array "subtasks"
 */
function addSubtask(){
    let task = document.getElementById('subtask').value;
    let taskJSON = {
        'id' : subtasks.length +1,
        'name' : task,
        'done' : false
    }
    document.getElementById('subTaskList').classList.remove('d-none');
    document.getElementById('buttons').setAttribute('style', "margin-top:0");
    subtasks.push(taskJSON);
    showSubtasksafterAddingATask();
    console.log(subtasks);
}

/**
 * This function generates and displays the Content of the Array "subtasks"
 */
function showSubtasks(){
    let subtasksList = document.getElementById('subTaskList');
    subtasksList.innerHTML = '';
    for (let i = 0; i < subtasks.length; i++){
        subtasksList.innerHTML +=`<li>${subtasks[i]['name']} <img class="hover" onclick="deleteSubtask(${i})" src="/assets/img/delete-contact.png"> </li>`;
    }
}
/**
 * This functions starts the Subtask adding process
 */
function showSubtasksafterAddingATask(){
    showSubtasks();
    activateAndDeactivateSubtaskInput();
    cancelSubtask();
}

/**
 * This function deletes a Subtasks from Array "subtasks" and displays the Array afterwards
 * @param {int} i - id of the Subtasks
 */
function deleteSubtask(i){
    subtasks.splice(i,1);
    showSubtasks();
    if (subtasks.length == 0){
        document.getElementById('buttons').setAttribute('style', "margin-top:232px");
        document.getElementById('subTaskList').classList.add('d-none');
    }
}

/**
 * collects the values of all inputs
 */
function getAllInputs(){ // Json auslagern -> funktioniert nicht..
    let id = allTasks.length +1; // Aufgaben dürfen erst aus allTasks gelöscht werden,wenn sie abgeschlossen sind!!
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let assignedTo = chosenContactsJson;
    let date = document.getElementById('date').value;
    let prio = currentchosenPrio;
    let category = document.getElementById('Category').innerHTML;
    const task = {
        'id': id,
        'title': title,
        'description': description,
        'date': date,
        'priority': prio,
        'subtask': subtasks,
        'subtasksProgress': 0,
        'category': category,
        'colum': 'todo',
        'contacts': assignedTo,
        token: STORAGE_TOKEN
    }
    creatingJson(task);
    clearForm();
    confirmTheCreationOfATask();   
}

/**
 * limits the possible Dates which can be chosen
 */
function minDate(){
    let TodaysDate = new Date().toISOString().split('T')[0];;
    document.getElementById('date').setAttribute('min',TodaysDate);
}

/**
 * safes the Json in an Array called "allTasks"
 * @param {Json} task - contains the safed Json
 */
function creatingJson(task){
    allTasks.push(task);
    safeAllTasksToStorage('AllTasks',allTasks);
}

/**
 * empties all input-fields
 */
function clearForm(){
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('assignedToSelect').value = '';;
    document.getElementById('date').value = '';
    document.getElementById('Category').value = '';
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

/**
 * This function toggles the Images of the "Assigned to" Input
 * @param {String} id - ID of the Input-Field "Assigned to"
 */
function flipTheImage(id){
    document.getElementById(`${id}`).classList.toggle('arrowdown');
    document.getElementById(`${id}`).classList.toggle('arrowup');
}

/**
 * this function sets the category
 * @param {string} category - sends the Category to this functions
 */
function setCategory(category){ 
    let chosenCategory = document.getElementById('Category');
    chosenCategory.innerHTML = `${category}`;
    document.getElementById('+').innerHTML = `<img src="/assets/img/+.png">`;
    document.getElementById('categories').classList.toggle('d-none');
    document.getElementById('Category').setAttribute('style','color:black')
    document.getElementById('overlayCategories').classList.toggle('d-none'); 
}

/**
 * This function toggles a list of all possible categorys
 */
function getAllCategories(){
    document.getElementById('categories').classList.toggle('d-none');
    document.getElementById('overlayCategories').classList.toggle('d-none');  
}

function closeOverlayCategories(){
    document.getElementById('overlayCategories').classList.toggle('d-none'); 
    document.getElementById('categories').classList.toggle('d-none');
}