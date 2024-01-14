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
]

/**
 * Renders tasks in the 'todo' column.
 *
 * @param {Array} tasks - An array of task objects.
 */
async function renderTasks() {
    let allTasks = await getItem('AllTasks');
    let columns = document.getElementById('board-distribution').children;
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
