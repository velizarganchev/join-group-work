/**
 * Renders tasks in the 'todo' column.
 *
 * @param {Array} tasks - An array of task objects.
 */
function renderTasks(tasks) {
    let todoColumn = document.getElementById('todo');
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
                        <div class="progress-done"></div>
                    </div>
                    <p class="subtasks-container">0/${task.subtasks} Subtasks</p>
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
            generateContactsHtml(task.contacts, task.id);
        }
    });
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
