/**
 * Renders tasks in the 'todo' column.
 *
 * @param {Array} tasks - An array of task objects.
 */
async function renderTasks(tasks) {
    let allTasks = await getItem('AllTasks');
    let todoColumn = document.getElementById('todo');

    if (allTasks) {
        tasks.forEach(task => {
            if (task.colum === 'todo') {
                const cardId = `card${task.id}`;
                todoColumn.innerHTML += /*html*/`
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
                if (task.subtasks > 0) {
                    setProgressSubtasks(task)
                }
                generateContactsHtml(task.contacts, task.id);
            }
        });
    }
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
