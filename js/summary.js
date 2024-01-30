/**
 * Initializes certain functions once the body of the page has fully loaded.
 */
async function initSummary() {
    checkLogInStatus();
    await init('summary');
    renderWelcomeMessage();
    renderTasksInToDo();
    renderTasksDone();
    sortTasks();
    renderUpcomingPrio();
    renderUpcomingDate();
    renderTasksInBoard();
    renderTasksInProgress();
    renderTasksAwaitingFeedback();
}


/**
 * Renders the welcome message on the summary page.
 */
function renderWelcomeMessage() {
    let username = getCurrentUsername();
    let time = new Date().getHours();
    if (window.innerWidth <= 1250) {
        renderMessageMobile(username, time);
    } else {
        renderMessageDesktop(username, time);
    }
}


/**
 * Renders the welcome message when on mobile device.
 * @param {string} username - Name of the current user.
 * @param {number} time - Current hour.
 */
function renderMessageMobile(username, time) {
    let mobileWelcomeMessage = document.getElementById('mobile-welcome');
    let welcomeMessage = document.getElementById('mobile-welcome-message');
    let usernameWrapper = document.getElementById('mobile-username-wrapper');
    chooseMessage(welcomeMessage, usernameWrapper, username, time);
    setTimeout(() => {
        mobileWelcomeMessage.style.zIndex = -1;
    }, 1500);
}


/**
 * Renders the welcome message when on desktop.
 * @param {string} username - Name of the current user.
 * @param {number} time - Current hour.
 */
function renderMessageDesktop(username, time) {
    let welcomeMessage = document.getElementById('welcome-message');
    let usernameWrapper = document.getElementById('username-wrapper');
    chooseMessage(welcomeMessage, usernameWrapper, username, time);
}


/**
 * Chooses how to greet, depending on the time.
 * @param {object} welcomeMessage The div which the welcome message is supposed to be shown in.
 * @param {object} usernameWrapper The div which the username is supposed to be shown in.
 * @param {string} username The name of the user.
 * @param {object} time Current time.
 */
function chooseMessage(welcomeMessage, usernameWrapper, username, time) {
    if (time < 10) {
        welcomeMessage.innerHTML = 'Good morning,';
        usernameWrapper.innerHTML = username;
    }
    if (time >= 10 && time < 14) {
        welcomeMessage.innerHTML = 'Good day,';
        usernameWrapper.innerHTML = username;
    }
    if (time >= 14 && time < 18) {
        welcomeMessage.innerHTML = 'Good afternoon,';
        usernameWrapper.innerHTML = username;
    }
    if (time >= 18) {
        welcomeMessage.innerHTML = 'Good evening,';
        usernameWrapper.innerHTML = username;
    }
}


/**
 * Renders the total amount of tasks on the board.
 */
function renderTasksInBoard() {
    let tasksInBoard = document.getElementById('tasks-amount');
    let tasksAmount = allTasks.length; //tasks --> allTasks
    tasksInBoard.innerHTML = tasksAmount;
}


/**
 * Sorts the tasks beginning with the latest task.
 */
function sortTasks() {
    allTasks.sort(function (a, b) { //tasks --> allTasks
        return new Date(a.date) - new Date(b.date);
    });
}


/**
 * Renders the upcoming task and its priority.
 */
function renderUpcomingPrio() {
    let upcomingPrio = document.getElementById('upcoming-prio');
    let prio = convertPrio(allTasks[0]['priority']); //tasks --> allTasks
    let upcomingDate = allTasks[0]['date']; //tasks --> allTasks
    let upcomingTasksAmount = allTasks.filter(t => t['date'] == upcomingDate).length; //tasks --> allTasks
    let upcomingTasks = document.getElementById('upcoming-tasks-amount');
    upcomingPrio.innerHTML = prio;
    changeImageSource('upcoming-prio-image', `/assets/img/board/prio-${prio}-white.svg`);
    toggleClass('upcoming-prio-image-wrapper', `prio-${prio}`);
    upcomingTasks.innerHTML = upcomingTasksAmount;
}


/**
 * Renders the due date of the upcoming task.
 */
function renderUpcomingDate() {
    let date = new Date(allTasks[0]['date']); //tasks --> allTasks
    let formattedMonth = date.toLocaleString('default', { month: 'long' });
    let year = date.getFullYear();
    let day = date.getDate();
    let upcomingDate = document.getElementById('upcoming-date');
    let upcomingMessage = document.getElementById('upcoming-message');
    upcomingDate.innerHTML = day + ' ' + formattedMonth + ',' + ' ' + year;
    upcomingMessage.innerHTML = "Upcoming deadline";
}


/**
 * Renders the amount of tasks which are in progress.
 */
function renderTasksInProgress() {
    let tasksInProgress = document.getElementById('in-progress-amount');
    let tasksAmount = allTasks.filter(t => t['colum'] == 'in-progress').length; //tasks --> allTasks
    tasksInProgress.innerHTML = tasksAmount;
}


/**
 * Renders the amount of tasks which await feedback.
 */
function renderTasksAwaitingFeedback() {
    let tasksAwaitingFeedback = document.getElementById('awaiting-feedback-amount');
    let tasksAmount = allTasks.filter(t => t['colum'] == 'await-feedback').length; //tasks --> allTasks
    tasksAwaitingFeedback.innerHTML = tasksAmount;
}


/**
 * Renders the amount of tasks which have to be done.
 */
function renderTasksInToDo() {
    let tasksToDo = document.getElementById('to-do-amount');
    let tasksAmount = allTasks.filter(t => t['colum'] == 'todo').length; //tasks --> allTasks
    tasksToDo.innerHTML = tasksAmount;
}


/**
 * Renders the amount of tasks which are done.
 */
function renderTasksDone() {
    let tasksDone = document.getElementById('done-amount');
    let tasksAmount = allTasks.filter(t => t['colum'] == 'done').length; //tasks --> allTasks
    tasksDone.innerHTML = tasksAmount;
}


/**
 * Converts the priority from a number to a string.
 * @param {number} number - Priority as a number. Number one represents ther priority "urgent" for example.
 * @returns Priority as string.
 */
function convertPrio(number) {
    if (number === 1) {
        return 'urgent'
    } else if (number === 2) {
        return 'medium'
    } else if (number === 3) {
        return 'low'
    }
}