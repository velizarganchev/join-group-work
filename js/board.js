let tasks = [
    {
        id: 1,
        title: 'Kochwelt Page & Recipe Recommender',
        description: 'Build start page with recipe recommendation',
        date: new Date(),
        priority: 'Medium',
        subtasks: [
            {
                id: 1,
                name: 'Implement Recipe Recommendation',
                done: false
            },
            {
                id: 2,
                name: 'Start Page Layout',
                done: false
            },
            {
                id: 3,
                name: 'Start Page Layout',
                done: false
            }
        ],
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
        title: 'CSS Architecture Planning',
        description: 'Define CSS naming conventions and structure.',
        date: new Date(),
        priority: 'Urgent',
        subtasks: [
            {
                id: 1,
                name: 'Establish CSS Methodology',
                done: false
            },
            {
                id: 2,
                name: 'Setup Base Styles',
                done: false
            }
        ],
        subtasksProgress: 0,
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
        date: new Date(),
        priority: 'Low',
        subtasks: [
            {
                id: 1,
                name: 'Implement Recipe Recommendation',
                done: false
            },
            {
                id: 2,
                name: 'Start Page Layout',
                done: false
            },
            {
                id: 3,
                name: 'Start Page Layout',
                done: false
            },
            {
                id: 4,
                name: 'Start Page Layout',
                done: false
            },
        ],
        subtasksProgress: 0,
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
        date: new Date(),
        priority: 'Low',
        subtasks: [
            {
                id: 1,
                name: 'Start Page Layout',
                done: false
            }
        ],
        subtasksProgress: 0,
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
];
let editSubtasks = [];
let columns;
let currentDraggedElement;


/**
 * Initializes certain functions once the body of the page has fully loaded.
 */
async function initBoard() {
    checkLogInStatus();
    await init('board');
    renderTasks();
}


/**
 * Renders tasks in the 'todo' column.
 *
 * @param {Array} searchedTasks - An optional array of task objects to render (filtered tasks based on search).
 */
async function renderTasks(searchedTasks) {
    // Retrieves all tasks from storage
    let allTasks = await getItem('AllTasks');

    // Accesses the column elements
    columns = document.getElementById('board-distribution').children;

    // Functions for accessing column elements
    let getColumnById = (columnId) => document.getElementById(columnId);
    let getColumnByTask = (task) => getColumnById(task.colum);

    // Functions for dynamically rendering cards and subtask progress
    let renderCardAndSubtasks = (task) => {
        let column = getColumnByTask(task);

        renderCard(task, column);
        if (task.subtasks.length > 0) {
            setProgressSubtasks(task);
        }
        generateContactsHtml(task.contacts, task.id);
    };

    // Rendering tasks based on the searchedTasks array or all tasks
    let tasksToRender = searchedTasks || tasks;
    tasksToRender.forEach(renderCardAndSubtasks);

    // Iterating through all columns and checking for tasks
    iterateByEachColumn(columns);
}


/**
 * Searches tasks based on the entered search term and renders the matching tasks.
 *
 * @param {Event} e - The event object that triggered the function call.
 */
function search(e) {
    e.preventDefault();
    // The search input element
    let searchTermInput = document.getElementById('search-text');

    // The entered search term (converted to lowercase for case insensitivity)
    let searchTerm = searchTermInput.value.toLowerCase();
    // Filters tasks based on the search term
    let searchedTasks = tasks.filter(task => task.title.toLowerCase().includes(searchTerm));

    // Clears all column contents
    clearAllColumns();
    // Renders the found tasks
    renderTasks(searchedTasks);
    // Clears the search input field
    searchTermInput.value = '';
}


/**
 * Opens the task pop-up by setting its display style to "flex" and populates it with HTML content.
 */
function openTask(taskId) {
    let task = tasks.find(t => t.id === taskId);
    let taskPopUp = document.getElementById('pop-up');
    taskPopUp.style.display = "flex";

    // Populate the task pop-up with HTML content
    taskPopUp.innerHTML = generateTaskHtml(task);
}


/**
 * Generates HTML content for the task pop-up.
 *
 * @returns {string} - The HTML string representing the task pop-up content.
 */
function generateTaskHtml(task) {

    let contactsHtml = task.contacts.map(generateContactHtml).join('');
    let subtasksHtml = task.subtasks.map(subtask => generateSubtaskHtml(subtask, task.id)).join('');
    let priorityIcon = generatePriorityIcon(task.priority);

    return /*html*/ `
        <!-- HTML content for the task pop-up -->
        <div class="pop-up-task-container" onclick="stopPropagation(event)">
            <!-- Pop-up header with buttons -->
            <div class="pop-up-task-header">
                <button class="pop-up-label">${task.category}</button>
                <button class="pop-up-close-button" onclick="closeTask()">
                    <img src="../assets/img/board/close-task.svg" alt="Close">
                </button>
            </div>        
            <!-- Task title and subtitle -->
            <div class="pop-up-task-title">
                <h2>${task.title}</h2>
            </div>
            <div class="pop-up-task-subtitle">
                <p>${task.description}</p>
            </div>
            <!-- Task date and priority -->
            <div class="pop-up-task-date">
                <span>Due date:</span>
                <span>${new Date(task.date).toLocaleDateString('DE')}</span>
            </div>
            <div class="pop-up-task-priority">
                <span>Priority:</span>
                <button class="pop-up-task-priority-button">
                    <span>${task.priority}</span>
                    ${priorityIcon}
                </button>
            </div>
            <!-- Assigned contacts -->
            <div class="pop-up-task-contacts-container">
                <p>Assigned to:</p>
                <div class="pop-up-task-contacts${task.id}">
                    <!-- Contacts details -->
                    ${contactsHtml}
                    <!-- Additional contacts go here -->
                </div>
            </div>          
            <!-- Subtasks section -->
            <div class="pop-up-task-subtasks-container">
                <p>Subtasks:</p>
                <div class="pop-up-task-subtasks">
                    <!-- Subtasks details -->
                    ${subtasksHtml}
                    <!-- Additional subtasks go here -->
                </div>
            </div>  
            <!-- Footer with task actions -->
            <div class="pop-up-task-footer">
                <button onclick="deleteTask(${task.id})">
                    <img src="../assets/img/board/pop-up-footer-delete.svg" alt="">
                    <span>Delete</span>
                </button>
                <img src="../assets/img/board/pop-up-footer-vector 3.svg" alt="">
                <button onclick="editTask(${task.id})">
                    <img src="../assets/img/board/pop-up-footer-edit.svg" alt="">
                    <span>Edit</span>
                </button>
            </div>
        </div>
    `;
}


function editTask(taskId) {
    let taskToEdit = getTask(taskId);
    let taskPopUp = document.getElementById('pop-up');
    taskPopUp.style.display = "flex";

    taskPopUp.innerHTML = generateEditTaskHtml(taskToEdit);
    handleEditPriority(taskToEdit.priority);
    handleEditContacts(taskToEdit.contacts);
    showSubtasks(taskToEdit.subtasks);
}


function generateEditTaskHtml(taskToEdit) {
    console.log(taskToEdit);
    return /*html*/`
        <div class="pop-up-task-container" onclick="stopPropagation(event)">
            <div class="edit-close-button-container">
                <button class="pop-up-close-button" onclick="closeTask()">
                    <img src="../assets/img/board/close-task.svg" alt="Close">
                </button>
            </div>
            <div class="edit-title-container">
                <span>Title</span>
                <input type="text" id="edit-title" placeholder="Enter Title" name="title" value="${taskToEdit.title}">
            </div>
            <div class="edit-description-container">
                <span>Description</span>
                <textarea id="edit-description" placeholder="Enter Description" name="description" rows="4" cols="30">${taskToEdit.description}</textarea>
            </div>
            <div class="edit-date-container">
                <span>Due date</span>
                <input value="${taskToEdit.date.toISOString().split('T')[0]}" min="${new Date().toISOString().split('T')[0]}" max="2024-01-31" type="date" id="edit-date" name="date">
            </div>
            <div class="edit-priority-container">
                <span>Priority</span>
                <div class="edit-priority-buttons">
                    <button id="urgent">
                        <span>Urgent</span>
                        <img id="edit-urgent-img" src="../assets/img/board/prio-urgent.svg" alt="">
                    </button>
                    <button id="medium">
                        <span>Medium</span>
                        <img id="edit-medium-img" src="../assets/img/board/prio-medium.svg" alt="">
                    </button>
                    <button id="low">
                        <span>Low</span>
                        <img id="edit-low-img" src="../assets/img/board/prio-low.svg" alt="">
                    </button>
                </div> 
            </div>
            <div class="edit-priority-container">
                <label for="edit-contacts">Assignet to:</label>
                <select name="contacts" id="edit-contacts">
                <option value="">Select contacts to assign</option>
                  <option value="1">Anton Mayer</option>
                  <option value="2">Anja Schulz</option>
                </select>
                <div id="edit-contacts-list" class="edit-contacts-container"></div>
            </div>
            <div class="edit-subtasks-container">
                <form onsubmit="addSubtask(event)">
                    <input id="subtask-text" type="text" minlength="3" required placeholder="add new subtask">
                    <button type="submit" class="add-subtask-btn">
                        <img src="../assets/img/board/subtask-plus.svg" alt="">
                    </button>
                </form>
                <ul class="edit-subtask-list">
                    
                </ul>
            </div>
            <div class="edit-button-container">
                <button>
                    <span>OK</span>
                    <img src="../assets/img/board/check.svg" alt="">
                </button>
            </div>
        </div>
    `;
}


/**
 * Renders a list of subtasks in the edit subtasks section.
 *
 * @param {Array} subtasks - An array of subtask objects.
 */
function showSubtasks(subtasks) {
    let subtasksList = document.querySelector('.edit-subtask-list');
    subtasksList.innerHTML = '';  // Clear the existing content before rendering new subtasks

    for (let i = 0; i < subtasks.length; i++) {
        const element = subtasks[i];
        subtasksList.innerHTML += /*html*/ `
            <li class="edit-subtask-item">
                <span>${element.name}</span>
                <div class="edit-subtask-icons">
                    <button>
                        <img src="../assets/img/board/edit-subtask-icon.svg" alt="">
                    </button>
                    <img src="../assets/img/board/vector3.svg" alt="">
                    <button>
                        <img src="../assets/img/board/delete-subtask-icon.svg" alt="">
                    </button>
                </div>
            </li>
        `;
    }
}


/**
 * Handles the addition of a subtask by updating the editSubtasks array and clearing the input field.
 *
 * @param {Event} e - The event object.
 */
function addSubtask(e) {
    e.preventDefault();
    const subtaskInput = document.getElementById('subtask-text');
    editSubtasks.push(subtaskInput.value);
    subtaskInput.value = '';
    console.log(editSubtasks);
}


/**
 * Handles the editing of contacts by updating the contacts list in the edit form.
 *
 * @param {Array} contacts - An array of contact objects.
 */
function handleEditContacts(contacts) {
    const contactsDiv = document.getElementById('edit-contacts-list');

    contactsDiv.innerHTML = contacts.map(generateEditContactHtml).join('');
}


/**
 * Generates HTML for an edit contact and returns it as a string.
 *
 * @param {Object} contact - The contact object.
 * @returns {string} - The HTML string for the edit contact.
 */
function generateEditContactHtml(contact) {
    return /*html*/ `<div class="edit-contact" style="background-color: ${contact.color};">${contact.name[0]}${contact.lastName[0]}</div>`;
}


/**
 * Handles the editing of priority by updating the button color and background image.
 *
 * @param {string} priority - The priority value ('Low', 'Medium', or 'Urgent').
 */
function handleEditPriority(priority) {
    const priorityMappings = {
        'Low': ['low', 'edit-low-img'],
        'Medium': ['medium', 'edit-medium-img'],
        'Urgent': ['urgent', 'edit-urgent-img']
    };

    const [idButton, idImg] = priorityMappings[priority];
    const button = document.getElementById(idButton);
    const img = document.getElementById(idImg);

    const background = setEditButtonBackground(idButton);

    button.style.color = 'white';
    button.style.background = background;
    img.src = `../assets/img/board/prio-${idButton}-white.svg`;
}


/**
 * Sets the background color for the edit button based on the priority.
 *
 * @param {string} idButton - The button ID.
 * @returns {string} - The background color.
 */
function setEditButtonBackground(idButton) {
    switch (idButton) {
        case 'low':
            return '#7AE229';
        case 'medium':
            return '#FFA800';
        case 'urgent':
            return '#FF3D00';
        default:
            return '';
    }
}


/**
 * Changes the status of a subtask and updates the task's progress.
 *
 * @param {HTMLInputElement} status - The checkbox element representing the subtask status.
 * @param {number} subtaskId - The unique identifier of the subtask.
 * @param {number} taskId - The unique identifier of the task containing the subtask.
 */
function changeSubtaskStatus(status, subtaskId, taskId) {
    let task = getTask(taskId);
    let subtaskIndex = task.subtasks.findIndex(sb => sb.id === subtaskId);

    if (status.checked) {
        task.subtasks[subtaskIndex].done = true;
        task.subtasksProgress++;
        //await setItem('AllTasks', tasks);

    } else {
        task.subtasks[subtaskIndex].done = false;
        task.subtasksProgress--;
        //await setItem('AllTasks', tasks);
    }

    clearAllColumns();
    renderTasks();
}


/**
 * Retrieves a task based on its unique identifier.
 *
 * @param {number} id - The unique identifier of the task.
 * @returns {Object} - The task object.
 */
function getTask(id) {
    return tasks.find(t => t.id === id);
}


/**
 * Deletes a task with the specified ID.
 *
 * @param {number} id - The ID of the task to be deleted.
 */
async function deleteTask(id) {
    // Retrieve the index of the task with the specified ID
    let taskToDelete = getTaskIndex(id);

    // Remove the task from the tasks array
    tasks.splice(taskToDelete, 1);

    // Clear all columns, render updated tasks, and close the task popup
    clearAllColumns();
    renderTasks();
    closeTask();
    //await setItem('AllTasks', tasks);
}


/**
 * Retrieves the index of a task in the tasks array based on its ID.
 *
 * @param {number} taskId - The ID of the task to find in the tasks array.
 * @returns {number} - The index of the task in the tasks array.
 */
function getTaskIndex(taskId) {
    return tasks.findIndex(t => t.id === taskId);
}


/**
 * Generates HTML for a contact in the pop-up task details.
 *
 * @param {Object} contact - The contact object containing information.
 * @returns {string} - The HTML string representing the contact.
 */
function generateContactHtml(contact) {
    return  /*html*/ `
        <div class="pop-up-task-contact">
            <div class="contact-label" style="background:${contact.color};">${contact.name[0] + contact.lastName[0]}</div>
            <div class="contact-name">${contact.name} ${contact.lastName}</div>
        </div>`;
}


/**
 * Generates HTML for a subtask in the pop-up task details.
 *
 * @param {Object} subtask - The subtask object containing information.
 * @returns {string} - The HTML string representing the subtask.
 */
function generateSubtaskHtml(subtask, taskId) {//!!!!!!!!!!!!!!
    return  /*html*/ `
        <div class="pop-up-task-subtask">
            <input type="checkbox" onchange="changeSubtaskStatus(this, ${subtask.id}, ${taskId})" ${subtask.done ? 'checked' : ''} >
            <span>${subtask.name}</span>
        </div>`;
}


/**
 * Closes the task pop-up by setting its display style to "none".
 */
function closeTask() {
    let taskPopUp = document.getElementById('pop-up');
    taskPopUp.style.display = "none";
}

/**
 * Stops the event propagation to prevent it from reaching the parent elements.
 *
 * @param {Event} event - The event for which propagation should be stopped.
 */
function stopPropagation(event) {
    event.stopPropagation();
}



/**
 * Handles the 'dragover' event to allow dropping elements.
 *
 * @param {Event} ev - The dragover event.
 */
function allowDrop(ev) {
    ev.preventDefault();
}


/**
 * Initiates the drag operation for a specific element.
 *
 * @param {number} id - The unique identifier of the dragged element.
 */
function startDragging(id) {
    currentDraggedElement = id;
}


/**
 * Moves the dragged element to a new column.
 *
 * @param {string} columnId - The unique identifier of the target column.
 */
function moveTo(columnId) {
    // Update the column value for the dragged task
    tasks[currentDraggedElement]['colum'] = columnId;
    // Clear all columns before re-rendering
    clearAllColumns();
    // Re-render tasks after moving
    renderTasks();
}


/**
 * Highlights the column if task is dragged over
 * 
 * @param {string} id - Id of highlightet column
 */
function highlight(id) {
    document.getElementById(id).classList.add('dragAreaHighlight');
}


/**
 * Removes the highlight when task is not longer dragged over the column
 * 
 * @param {string} id - Id of highlightet column
 */
function removeHighlight(id) {
    document.getElementById(id).classList.remove('dragAreaHighlight');
}


/**
 * Clears the content of all columns.
 */
function clearAllColumns() {
    for (let i = 0; i < columns.length; i++) {
        const element = columns[i];
        element.innerHTML = '';
    }
}


/**
 * Iterates through an array of columns and checks each column for tasks. If a column has no tasks, a no tasks card is generated and appended.
 *
 * @param {Array<HTMLElement>} columns - An array of column elements to iterate through.
 */
function iterateByEachColumn(columns) {
    for (let i = 0; i < columns.length; i++) {
        let el = columns[i];
        checkColumnForTasks(el);
    }
}


/**
 * Checks if a column has child nodes (tasks). If not, generates and appends HTML for a no tasks card.
 *
 * @param {HTMLElement} column - The column element to check for tasks.
 */
function checkColumnForTasks(column) {
    if (!column.hasChildNodes()) {
        column.innerHTML = generateNoTaskHtml();
    }
}


/**
 * Generates the HTML for a task card.
 *
 * @param {string} cardId - The unique identifier for the card.
 * @param {Object} task - The task object containing information to be displayed on the card.
 * @returns {string} - The HTML string representing the task card.
 */
function generateCardHtml(cardId, task) {
    let priorityIcon = generatePriorityIcon(task.priority);
    if (task) {
        return /*html*/ `
        <div class="card-container" onclick="openTask(${task.id})" draggable="true" ondragstart="startDragging(${getTaskIndex(task.id)})" id="${cardId}">
            <button class="card-label">${task.category}</button>
            <h3 class="card-title">${task.title}</h3>
            <p class="card-content">${task.description}</p>
            <div class="progress-bar-container">
                <div class="progress-bar">
                    <div class="progress-done" id="progress${task.id}"></div>
                </div>
                <p class="subtasks-container">${task.subtasksProgress}/${task.subtasks.length} Subtasks</p>
            </div>
            <div class="card-footer">
                <div class="profiles" id="tasksProfiles${task.id}"></div>
                <div class="priority-container">
                    ${priorityIcon}
                </div>
            </div>
        </div>
    `;
    }
}


/**
 * Generates HTML for a priority icon based on the specified priority level.
 *
 * @param {string} priority - The priority level ('Low', 'Medium', or 'Urgent').
 * @returns {string} - The HTML string representing the priority icon.
 */
function generatePriorityIcon(priority) {
    switch (priority) {
        case 'Low':
            return /*html*/`<img src="../assets/img/board/prio-low.svg" alt="Priority Icon">`;
        case 'Medium':
            return /*html*/`<img src="../assets/img/board/prio-medium.svg" alt="Priority Icon">`;
        case 'Urgent':
            return /*html*/`<img src="../assets/img/board/prio-urgent.svg" alt="Priority Icon">`;
    }
}


/**
 * Generates the HTML for a no tasks card.
 *
 * @returns {string} - The HTML string representing the container.
 */
function generateNoTaskHtml() {
    return /*html*/ `
        <div class="no-task-card-container">
            <h3>No tasks</h3>
        </div>
    `;
}



/**
 * Renders a task card and appends it to the specified column element.
 *
 * @param {Object} task - The task object to be rendered.
 * @param {HTMLElement} column - The column element where the card will be appended.
 */
function renderCard(task, column) {
    // Append the generated HTML for the task card to the specified column
    column.innerHTML += generateCardHtml(`card${task.id}`, task);
}


/**
 * Sets the progress of subtasks for a given task.
 *
 * @param {Object} task - The task object containing information about subtasks.
 * @param {string} task.id - The unique identifier of the task.
 * @param {number} task.subtasksProgress - The current progress of subtasks.
 * @param {number} task.subtasks - The total number of subtasks.
 */
function setProgressSubtasks(task) {
    // Get the progress bar element based on the task ID
    let progressDone = document.getElementById(`progress${task.id}`);

    // Calculate the final value of the progress bar (based on subtasksProgress)
    let finalValue = task.subtasksProgress * 10;

    // Calculate the maximum value of the progress bar (based on the total number of subtasks)
    let max = task.subtasks.length * 10;

    // Calculate the progress in percentage
    let progressInPercent = (finalValue / max) * 100;

    // Set the width of the progress bar to represent the calculated percentage
    progressDone.style.width = `${progressInPercent.toString()}%`;
}


/**
 * Generates HTML for contacts and appends it to the specified profiles container.
 *
 * @param {Array} contacts - An array of contact objects.
 * @param {number} id - The task ID.
 */
function generateContactsHtml(contacts, id) {
    let profiles = document.getElementById(`tasksProfiles${id}`);
    let onlyFirstLetter = takeFirstLetters(contacts);
    for (let i = 0; i < onlyFirstLetter.length; i++) {
        let element = onlyFirstLetter[i];
        profiles.innerHTML += `
            <div class="profile" style="background-color: ${contacts[i].color};">${element}</div>
        `;
    }
}


/**
 * Extracts the first letters of names and last names from an array of contacts.
 *
 * @param {Array} contacts - An array of contact objects.
 * @returns {Array} - An array of strings representing the first letters.
 */
function takeFirstLetters(contacts) {
    return contacts.map(c => c.name[0] + c.lastName[0]);
}
