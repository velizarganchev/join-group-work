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
let contacts = [
    {
        name: "Alice Smith",
        email: "alice@example.com",
        phone: "+49 123 456789",
        color: "#3498db",
    },
    {
        name: "Bob Johnson",
        email: "bob@example.com",
        phone: "+49 234 567890",
        color: "#2ecc71",
    },
    {
        name: "Brad Williams",
        email: "brad@example.com",
        phone: "+49 345 678901",
        color: "#e74c3c",
    },
    {
        name: "Michael Davis",
        email: "michael@example.com",
        phone: "+49 456 789012",
        color: "#f39c12",
    },
    {
        name: "David Clark",
        email: "david@example.com",
        phone: "+49 567 890123",
        color: "#9b59b6",
    },
    {
        name: "Diana Martinez",
        email: "diana@example.com",
        phone: "+49 678 901234",
        color: "#1abc9c",
    },
    {
        name: "Eva Miller",
        email: "eva@example.com",
        phone: "+49 789 012345",
        color: "#3498db",
    },
    {
        name: "Sam Taylor",
        email: "sam@example.com",
        phone: "+49 890 123456",
        color: "#2ecc71",
    },
    {
        name: "Sara Brown",
        email: "sara@example.com",
        phone: "+49 901 234567",
        color: "#e74c3c",
    },
    {
        name: "Ross Wilson",
        email: "ross@example.com",
        phone: "+49 012 345678",
        color: "#f39c12",
    },
    {
        name: "Kate Moore",
        email: "kate@example.com",
        phone: "+49 345 678901",
        color: "#9b59b6",
    },
    {
        name: "Karl Lee",
        email: "karl@example.com",
        phone: "+49 567 890123",
        color: "#1abc9c",
    },
    {
        name: "John Turner",
        email: "john@example.com",
        phone: "+49 789 012345",
        color: "#3498db",
    },
];
currPriority = '';
let editSubtasks = [];
let columns;
let currentDraggedElement;


/**
 * Initializes certain functions once the body of the page has fully loaded.
 */
async function initBoard() {
    checkLogInStatus();
    await init('board', 'task_from');
    renderTasks();
}


/**
 * Renders tasks in the 'todo' column.
 *
 * @param {Array} searchedTasks - An optional array of task objects to render (filtered tasks based on search).
 */
async function renderTasks(searchedTasks) {

    // tasks = JSON.parse(await getItem('AllTasks'));

    columns = document.getElementById('board-distribution').children;

    let getColumnById = (columnId) => document.getElementById(columnId);
    let getColumnByTask = (task) => getColumnById(task.colum);

    let renderCardAndSubtasks = (task) => {
        let column = getColumnByTask(task);

        renderCard(task, column);
        if (task.subtasks.length > 0) {
            setProgressSubtasks(task);
        }
        generateContactsHtml(task.contacts, task.id);
    };

    let tasksToRender = searchedTasks || tasks;
    tasksToRender.forEach(renderCardAndSubtasks);

    iterateByEachColumn(columns);
}


/**
 * Opens the pop-up window for adding a new task.
 */
function openAddTask() {
    const addTaskDiv = document.getElementById('pop-up-add-task');
    addTaskDiv.style.display = 'flex';
}


/**
 * Searches tasks based on the entered search term and renders the matching tasks.
 *
 * @param {Event} e - The event object that triggered the function call.
 */
function search(e) {
    e.preventDefault();
    let searchTermInput = document.getElementById('search-text');

    let searchTerm = searchTermInput.value.toLowerCase();
    let searchedTasks = tasks.filter(task => task.title.toLowerCase().includes(searchTerm));

    clearAllColumns();
    renderTasks(searchedTasks);
    searchTermInput.value = '';
}


/**
 * Opens the task pop-up by setting its display style to "flex" and populates it with HTML content.
 */
function openTask(taskId) {
    let task = tasks.find(t => t.id === taskId);
    let taskPopUp = document.getElementById('pop-up');
    taskPopUp.style.display = "flex";

    taskPopUp.innerHTML = generateTaskHtml(task);
}


/**
 * Displays the edit task popup with the details of the specified task.
 *
 * @param {string} taskId - The ID of the task to be edited.
 */
function showEditTask(taskId) {
    const taskToEdit = getTask(taskId);
    const taskPopUp = document.getElementById('pop-up');

    taskPopUp.style.display = "flex";

    taskPopUp.innerHTML = generateEditTaskHtml(taskToEdit);

    handleEditPriority(taskToEdit.priority);
    // handleEditContacts(taskToEdit.contacts);
    // generateContactsSelectHtml();
    showSubtasks(taskToEdit.id, taskToEdit.subtasks);
}






/**
 * Bearbeitet eine Aufgabe, indem die eingegebenen Werte aus den Bearbeitungsfeldern genommen und in die Aufgabe aktualisiert werden.
 *
 * @param {string} taskId - Die ID der zu bearbeitenden Aufgabe.
 */
function editTask(taskId) {
    const task = getTask(taskId);
    task.title = document.getElementById('edit-title').value;
    task.description = document.getElementById('edit-description').value;
    task.date = new Date(document.getElementById('edit-date').value);
    task.priority = currPriority ? currPriority : task.priority;

    task.subtasks = [...task.subtasks, ...editSubtasks];

    clearAllColumns();
    renderTasks();
    closeTask("pop-up");
}


/**
 * Löscht eine Teilaufgabe aus einer bestimmten Aufgabe und aktualisiert die Anzeige der Teilaufgaben.
 *
 * @param {string} taskId - Die ID der Aufgabe, zu der die Teilaufgabe gehört.
 * @param {string} subtaskId - Die ID der zu löschenden Teilaufgabe.
 */
function deleteSubtask(taskId, subtaskId) {
    const task = getTask(taskId);
    task.subtasks = task.subtasks.filter(subtask => subtask.id !== subtaskId);
    showSubtasks(taskId, task.subtasks);
}


/**
 * Renders a list of subtasks in the edit subtasks section.
 *
 * @param {Array} subtasks - An array of subtask objects.
 */
function showSubtasks(taskId, subtasks) {
    let subtasksList = document.querySelector('.edit-subtask-list');
    subtasksList.innerHTML = '';

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
                    <button onclick="deleteSubtask(${taskId}, ${element.id})">
                        <img src="../assets/img/board/delete-subtask-icon.svg" alt="">
                    </button>
                </div>
            </li>
        `;
    }
}


/**
 * Handles the addition of a subtask to a specific task by updating the task's subtasks array and clearing the input field.
 *
 * @param {Event} e - The event object.
 * @param {string} taskId - The ID of the task to which the subtask will be added.
 */
function addSubtask(e, taskId) {
    e.preventDefault();

    const task = getTask(taskId);
    const subtaskInput = document.getElementById('subtask-text');

    const subtaskToAdd = {
        id: Math.round(Math.random() * 100),
        name: subtaskInput.value,
        done: false
    };
    task.subtasks.push(subtaskToAdd);
    subtaskInput.value = '';
    showSubtasks(taskId, task.subtasks);
}


/**
 * Resets the CSS for priority buttons.
 */
function resetPriorityButtons() {
    const priorities = ['low', 'medium', 'urgent'];

    priorities.forEach(priority => {
        const button = document.getElementById(priority);
        const img = document.getElementById(`edit-${priority}-img`);

        button.style.color = '';
        button.style.background = '';
        img.src = `../assets/img/board/prio-${priority}.svg`;
    });
}


/**
 * Changes the priority of a task and updates the UI.
 *
 * @param {string} btnId - ID of the priority button.
 * @param {string} taskId - ID of the task.
 */
function changePriority(btnId) {
    resetPriorityButtons();
    handleEditPriority(capitalizeFirstLetter(btnId));
    currPriority = capitalizeFirstLetter(btnId);
}


/**
 * Handles the CSS changes for priority buttons.
 *
 * @param {string} priority - Priority level.
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
 * Sets the background color for a priority button.
 *
 * @param {string} idButton - ID of the priority button.
 * @returns {string} - Background color for the button.
 */
function setEditButtonBackground(idButton) {
    // Implement your background color logic here
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
    let taskToDelete = getTaskIndex(id);
    tasks.splice(taskToDelete, 1);

    clearAllColumns();
    renderTasks();
    closeTask("pop-up");
    await setItem('AllTasks', tasks);
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
 * Closes the task pop-up by setting its display style to "none".
 */
function closeTask(id) {
    let taskPopUp = document.getElementById(id);
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
    tasks[currentDraggedElement]['colum'] = columnId;
    clearAllColumns();
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
 * Renders a task card and appends it to the specified column element.
 *
 * @param {Object} task - The task object to be rendered.
 * @param {HTMLElement} column - The column element where the card will be appended.
 */
function renderCard(task, column) {
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
    let progressDone = document.getElementById(`progress${task.id}`);
    let finalValue = task.subtasksProgress * 10;
    let max = task.subtasks.length * 10;
    let progressInPercent = (finalValue / max) * 100;
    progressDone.style.width = `${progressInPercent.toString()}%`;
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


/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} string - The input string.
 * @returns {string} - The string with the first letter capitalized.
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

