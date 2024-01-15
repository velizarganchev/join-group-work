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
];
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
 * @param {Array} tasks - An array of task objects.
 */
async function renderTasks() {
    let allTasks = await getItem('AllTasks');
    columns = document.getElementById('board-distribution').children;
    let todoColumn = document.getElementById('todo');
    let inProgressColumn = document.getElementById('in-progress');
    let awaitFeedbackColumn = document.getElementById('await-feedback');
    let doneColumn = document.getElementById('done');

    if (allTasks) {
        tasks.forEach(task => {
            if (task.colum === 'todo') {
                renderCard(task, todoColumn);
            } else if (task.colum === 'in-progress') {
                renderCard(task, inProgressColumn);
            } else if (task.colum === 'await-feedback') {
                renderCard(task, awaitFeedbackColumn);
            } else if (task.colum === 'done') {
                renderCard(task, doneColumn);
            }
            if (task.subtasks > 0) {
                setProgressSubtasks(task)
            }
            generateContactsHtml(task.contacts, task.id);
        });
    }
    iterateByEachColumn(columns);
}


/**
 * Opens the task pop-up by setting its display style to "flex" and populates it with HTML content.
 */
function openTask() {
    let taskPopUp = document.getElementById('pop-up');
    taskPopUp.style.display = "flex";

    // Populate the task pop-up with HTML content
    taskPopUp.innerHTML = generateTaskHtml();
}


/**
 * Generates HTML content for the task pop-up.
 *
 * @returns {string} - The HTML string representing the task pop-up content.
 */
function generateTaskHtml() {
    return /*html*/ `
        <!-- HTML content for the task pop-up -->
        <div class="pop-up-task-container" onclick="stopPropagation(event)">
            <!-- Pop-up header with buttons -->
            <div class="pop-up-task-header">
                <button class="pop-up-label">User Story</button>
                <button class="pop-up-close-button" onclick="closeTask()">
                    <img src="../assets/img/board/close-task.svg" alt="Close">
                </button>
            </div>
            
            <!-- Task title and subtitle -->
            <div class="pop-up-task-title">
                <h2>Kochwelt Page & Recipe Recommender</h2>
            </div>
            <div class="pop-up-task-subtitle">
                <p>Build start page with recipe recommendation</p>
            </div>
            
            <!-- Task date and priority -->
            <div class="pop-up-task-date">
                <span>Due date:</span>
                <span>10/05/2024</span>
            </div>
            <div class="pop-up-task-priority">
                <span>Priority:</span>
                <button class="pop-up-task-priority-button">
                    <span>Medium</span>
                    <img src="../assets/img/board/pop-up-prio-media.svg" alt="">
                </button>
            </div>
            
            <!-- Assigned contacts -->
            <div class="pop-up-task-contacts-container">
                <p>Assigned to:</p>
                <div class="pop-up-task-contacts">
                    <!-- Contacts details -->
                    <div class="pop-up-task-contact">
                        <div class="contact-label">AD</div>
                        <div class="contact-name">Marcel Mauer</div>
                    </div>
                    <!-- Additional contacts go here -->
                </div>
            </div>
            
            <!-- Subtasks section -->
            <div class="pop-up-task-subtasks-container">
                <p>Subtasks:</p>
                <div class="pop-up-task-subtasks">
                    <!-- Subtasks details -->
                    <div class="pop-up-task-subtask">
                        <input type="checkbox">
                        <span>Implement Recipe Recommendation</span>
                    </div>
                    <!-- Additional subtasks go here -->
                </div>
            </div>
            
            <!-- Footer with task actions -->
            <div class="pop-up-task-footer">
                <button>
                    <img src="../assets/img/board/pop-up-footer-delete.svg" alt="">
                    <span>Delete</span>
                </button>
                <img src="../assets/img/board/pop-up-footer-vector 3.svg" alt="">
                <button>
                    <img src="../assets/img/board/pop-up-footer-edit.svg" alt="">
                    <span>Edit</span>
                </button>
            </div>
        </div>
    `;
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
    tasks[currentDraggedElement - 1]['colum'] = columnId;
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
    return /*html*/ `
        <div class="card-container" onclick="openTask()" draggable="true" ondragstart="startDragging(${task.id})" id="${cardId}">
            <button class="card-label">${task.category}</button>
            <h3 class="card-title">${task.title}</h3>
            <p class="card-content">${task.description}</p>
            <div class="progress-bar-container">
                <div class="progress-bar">
                    <div class="progress-done" id="progress${task.id}"></div>
                </div>
                <p class="subtasks-container">${task.subtasksProgress}/${task.subtasks} Subtasks</p>
            </div>
            <div class="card-footer">
                <div class="profiles" id="tasksProfiles${task.id}">
                </div>
                <div class="priority-container">
                    <img src="../assets/img/board/prio-media.svg" alt="Priority Icon">
                </div>
            </div>
        </div>
    `;
}


/**
 * Generates the HTML for a no tasks card.
 *
 * @returns {string} - The HTML string representing the container.
 */
function generateNoTaskHtml() {
    return /*html*/ `
        <div class="no-task-card-container">
            <h3>No tasks To do</h3>
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
    let max = task.subtasks * 10;

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
