currPriority = 0;
let editSubtasks = [];
let columns = [];
let columnIds = ['todo', 'in-progress', 'await-feedback', 'done'];
let currentDraggedElement;

/**
 * Initializes certain functions once the body of the page has fully loaded.
 */
async function initBoard() {
    checkLogInStatus();
    await init('board', 'task_from');
    await loadTasks();
    searchOnTyping();
    renderTasks();
}

/**
 * Renders tasks in the 'todo' column.
 *
 * @param {Array} searchedTasks - An optional array of task objects to render (filtered tasks based on search).
 */
async function renderTasks(searchedTasks) {
    try {
        await loadTasks();
        takeAllColumns();

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

        let tasksToRender = searchedTasks || allTasks;
        tasksToRender.forEach(renderCardAndSubtasks);

        iterateByEachColumn(columns);
    } catch (error) {
        console.error('Error rendering tasks:', error);
    }
}


/**
 * Handles the search functionality as the user types, filtering tasks based on the entered search term.
 *
 * @param {Event} e - The input event object.
 */
function searchByLetter(e) {
    const searchInput = document.getElementById('search-text');
    const search_term = e.target.value.toLowerCase();

    const searchedTasks = allTasks.filter(task =>
        task.title.toLowerCase().includes(search_term)
    );

    clearAllColumns();
    renderTasks(searchedTasks);
}


/**
 * Adds an input event listener to trigger the search while typing.
 */
function searchOnTyping() {
    const searchInput = document.getElementById('search-text');
    searchInput.addEventListener('input', searchByLetter);
}

/**
 * Takes all columns based on their IDs and stores them in the 'columns' array.
 */
function takeAllColumns() {
    columns = columnIds.map((id) => {
        const currColumn = document.getElementById(id);
        return currColumn;
    });
}


/**
 * Opens the pop-up window for adding a new task.
 */
function openAddTask() {
    const addTaskDiv = document.getElementById('pop-up-add-task');
    addTaskDiv.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    minDate();
    choosePrio(2);
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
    let searchedTasks = allTasks.filter(task => task.title.toLowerCase().includes(searchTerm));

    clearAllColumns();
    renderTasks(searchedTasks);
    searchTermInput.value = '';
}



/**
 * Opens the task pop-up by setting its display style to "flex" and populates it with HTML content.
 */
function openTask(taskId) {
    let task = allTasks.find(t => t.id === taskId);
    let taskPopUp = document.getElementById('pop-up');
    taskPopUp.style.display = "flex";

    taskPopUp.innerHTML = generateTaskHtml(task);
    document.body.style.overflow = 'hidden';
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
    showSubtasksInEdit(taskToEdit.id, taskToEdit.subtasks);
}


/**
 * Edits an existing task based on the provided taskId.
 *
 * @param {string} taskId - The unique identifier of the task to be edited.
 */
async function editTask(taskId) {
    const task = getTask(taskId);

    task.title = document.getElementById('edit-title').value;
    task.description = document.getElementById('edit-description').value;
    task.date = new Date(document.getElementById('edit-date').value);
    task.priority = currPriority ? currPriority : task.priority;
    task.contacts = chosenContactsJson;
    task.subtasks = [...task.subtasks, ...editSubtasks];

    await setItem('AllTasks', allTasks);
    await loadTasks();

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
    showSubtasksInEdit(taskId, task.subtasks);
}


/**
 * Renders a list of subtasks in the edit subtasks section.
 *
 * @param {Array} subtasks - An array of subtask objects.
 */
function showSubtasksInEdit(taskId, subtasks) {
    let subtasksList = document.querySelector('.edit-subtask-list');
    subtasksList.innerHTML = '';

    for (let i = 0; i < subtasks.length; i++) {
        const element = subtasks[i];
        subtasksList.innerHTML += /*html*/ `
            <li class="edit-subtask-item" id="edit-subtask-item${element.id}">
                <span>${element.name}</span>
                <div class="edit-subtask-icons" id="edit-subtask-icons${element.id}">
                    <button onclick="showEditSubtaskField(${taskId}, ${element.id})">
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
 * Displays the edit subtask field with the current subtask text.
 *
 * @param {string} taskId - The ID of the task.
 * @param {string} subtaskId - The ID of the subtask.
 */
function showEditSubtaskField(taskId, subtaskId) {
    let listItem = document.getElementById(`edit-subtask-item${subtaskId}`);
    listItem.classList.remove('edit-subtask-item');
    listItem.classList.add('edit-subtask-item-text');

    if (listItem) {
        listItem.innerHTML = '';
        let task = getTask(taskId);
        let subtaskIndex = task.subtasks.findIndex(sb => sb.id === subtaskId);

        if (subtaskIndex !== -1) {
            let text = task.subtasks[subtaskIndex].name;
            listItem.innerHTML = generateEditSubtaskTextHtml(taskId, subtaskId, text);
        } else {
            console.error('Subtask not found for editing.');
        }
    } else {
        console.error('List item not found for editing subtask.');
    }
}


/**
 * Edits the text of a subtask and updates the display.
 *
 * @param {string} taskId - The ID of the task.
 * @param {string} subtaskId - The ID of the subtask.
 */
function editSubtaskText(taskId, subtaskId) {
    let input = document.getElementById('edit-subtask-text-input');
    let task = getTask(Number(taskId));
    let subtaskIndex = task.subtasks.findIndex(sb => sb.id === Number(subtaskId));

    if (subtaskIndex !== -1) {
        task.subtasks[subtaskIndex].name = input.value;
        showSubtasksInEdit(taskId, task.subtasks);
    } else {
        console.error('Subtask not found for editing.');
    }
}


/**
 * Handles the addition of a subtask to a specific task by updating the task's subtasks array and clearing the input field.
 *
 * @param {Event} e - The event object.
 * @param {string} taskId - The ID of the task to which the subtask will be added.
 */
function addSubtaskInEdit(e, taskId) {
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
    showSubtasksInEdit(taskId, task.subtasks);
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
 * @param {number} btnId - ID of the priority button.
 */
function changePriority(btnId) {
    resetPriorityButtons();
    handleEditPriority(btnId);
    currPriority = btnId;
}


/**
 * Handles the CSS changes for priority buttons.
 *
 * @param {string} priority - Priority level.
 */
function handleEditPriority(priority) {

    const priorityMappings = {
        3: ['low', 'edit-low-img'],
        2: ['medium', 'edit-medium-img'],
        1: ['urgent', 'edit-urgent-img']
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
async function changeSubtaskStatus(status, subtaskId, taskId) {
    let task = getTask(taskId);
    let subtaskIndex = task.subtasks.findIndex(sb => sb.id === subtaskId);

    if (status.checked) {

        task.subtasks[subtaskIndex].done = true;
        task.subtasksProgress++;
        await setItem('AllTasks', allTasks);
        await loadTasks();

        clearAllColumns();
        renderTasks();

    } else if (!status.checked) {
        task.subtasks[subtaskIndex].done = false;
        task.subtasksProgress--;

        if (task.subtasksProgress < 0) {
            task.subtasksProgress = 0;
        }

        await setItem('AllTasks', allTasks);
        await loadTasks();

        clearAllColumns();
        renderTasks();
    }
}


/**
 * Retrieves a task based on its unique identifier.
 *
 * @param {number} id - The unique identifier of the task.
 * @returns {Object} - The task object.
 */
function getTask(id) {
    return allTasks.find(t => t.id === id);
}


/**
 * Deletes a task with the specified ID.
 *
 * @param {number} id - The ID of the task to be deleted.
 */
async function deleteTask(id) {
    let taskToDelete = getTaskIndex(id);
    allTasks.splice(taskToDelete, 1);

    await setItem('AllTasks', allTasks);
    await loadTasks();

    clearAllColumns();
    renderTasks();
    closeTask("pop-up");


}


/**
 * Retrieves the index of a task in the tasks array based on its ID.
 *
 * @param {number} taskId - The ID of the task to find in the tasks array.
 * @returns {number} - The index of the task in the tasks array.
 */
function getTaskIndex(taskId) {
    return allTasks.findIndex(t => t.id === taskId);
}


/**
 * Closes the task pop-up by setting its display style to "none".
 */
function closeTask(id) {
    let taskPopUp = document.getElementById(id);
    taskPopUp.style.display = "none";
    document.body.style.overflow = '';
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
async function moveTo(columnId) {
    allTasks[currentDraggedElement]['colum'] = columnId;
    await setItem('AllTasks', allTasks);
    await loadTasks();

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
    return contacts.map(c => c.firstname[0] + c.lastname[0]);
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

