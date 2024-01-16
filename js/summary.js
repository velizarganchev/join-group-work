/**
 * Initializes certain functions once the body of the page has fully loaded.
 */
async function initSummary() {
    checkLogInStatus();
    await init('summary');
    renderWelcomeMessage();
    renderTasksInBoard();
    sortTasks();
    renderUpcomingPrio();
    renderUpcomingDate();
}


/**
 * Renders the welcome message on the summary page, depending on the time.
 */
function renderWelcomeMessage() {
    let welcomeMessage = document.getElementById('welcome-message');
    let usernameWrapper = document.getElementById('username-wrapper');
    let username = getCurrentUsername();
    let time = new Date().getHours()
    if (time < 10) {
        welcomeMessage.innerHTML = 'Good morning,';
        usernameWrapper.innerHTML = username;
    }
    if (time >= 10 && time < 14) {
        welcomeMessage.innerHTML = 'Good day,';
        usernameWrapper.innerHTML = username;
    }
    if (time >= 14 && time <18) {
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
    let tasksAmount = allTasks.length;
    tasksInBoard.innerHTML = tasksAmount;
}


/**
 * Sorts the tasks beginning with the latest task.
 */
function sortTasks() {
    allTasks.sort(function(a, b) {
        return new Date(a.date) - new Date(b.date);
    });
}


/**
 * Renders the upcoming task and its priority.
 */
function renderUpcomingPrio() {
    // let upcomingPrio = document.getElementById('upcoming-prio');
    let prio = allTasks[0]['prio'];
    let upcomingDate = allTasks[0]['date'];
    let upcomingTasksAmount = allTasks.filter(t => t['date'] == upcomingDate).length;
    let upcomingTasks = document.getElementById('upcoming-tasks-amount');
    // upcomingPrio.innerHTML = prio;
    changeImageSource('upcoming-prio-image', `/assets/img/Prio${prio}White.png`);
    toggleClass('upcoming-prio-image-wrapper', `prio-${prio}`);
    upcomingTasks.innerHTML = upcomingTasksAmount;
}


/**
 * Renders the due date of the upcoming task.
 */
function renderUpcomingDate() {
    let date = new Date(allTasks[0]['date']);
    let formattedMonth = date.toLocaleString('default', {month: 'long'});
    let year = date.getFullYear();
    let day = date.getDate();
    let upcomingDate = document.getElementById('upcoming-deadline');
    upcomingDate.innerHTML = day + ' ' + formattedMonth + ',' + ' ' + year;
}