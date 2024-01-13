/**
 * Renders tasks in the 'todo' column.
 *
 * @param {Array} tasks - An array of task objects.
 */
async function renderTasks(tasks) {
    let allTasks = await getItem('AllTasks');
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
        <div class="card-container" id="${cardId}">
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
        const element = onlyFirstLetter[i];
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
