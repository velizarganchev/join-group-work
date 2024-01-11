const contacts = [
    { name: 'Alice Brenda Smith', email: 'alice@example.com', color: '#3498db' },
    { name: 'Bob Johnson', email: 'bob@example.com', color: '#2ecc71' },
    { name: 'Brad Williams', email: 'brad@example.com', color: '#e74c3c' },
    { name: 'Michael Davis', email: 'michael@example.com', color: '#f39c12' },
    { name: 'David Clark', email: 'david@example.com', color: '#9b59b6' },
    { name: 'Diana Martinez', email: 'diana@example.com', color: '#1abc9c' },
    { name: 'Eva Miller', email: 'eva@example.com', color: '#3498db' },
    { name: 'Sam Taylor', email: 'sam@example.com', color: '#2ecc71' },
    { name: 'Sara Brown', email: 'sara@example.com', color: '#e74c3c' },
    { name: 'Ross Wilson', email: 'ross@example.com', color: '#f39c12' },
    { name: 'Kate Moore', email: 'kate@example.com', color: '#9b59b6' },
    { name: 'Karl Lee', email: 'karl@example.com', color: '#1abc9c' },
    { name: 'John Turner', email: 'john@example.com', color: '#3498db' }
];


/**
 * Renders contact overview section
 */
function renderContactBook() {
    const contactOverview = document.getElementById('contactOverviewContent');
    const sortedContacts = sortContactsAlphabetically();

    let currentGroup = null;

    for (let i = 0; i < sortedContacts.length; i++) {
        const contact = sortedContacts[i];
        const groupInitial = contact.name.charAt(0).toUpperCase();

        handleGroupChange(currentGroup, groupInitial, contactOverview);
        currentGroup = groupInitial;

        let circleStyle = `background-color: ${contact.color};`;
        let circleClass = `circle-${contact.name.charAt(0).toUpperCase()}`;
        let nameParts = contact.name.split(' ');
        let contactInitials = calculateContactInitials(nameParts);

        renderContactItem(contactOverview, circleStyle, circleClass, contactInitials, contact);
    }

    handleLastGroup(currentGroup, contactOverview);
}


/**
 * Sorts the contacts alphabetically based on the name.
 *
 * @returns {Array} - The sorted contacts.
 */
function sortContactsAlphabetically() {
    return contacts.slice().sort((a, b) => a.name.localeCompare(b.name));
}


/**
 * Handles changes in the current group and renders the new group header if needed.
 *
 * @param {string} currentGroup - The current group.
 * @param {string} newGroup - The new group.
 * @param {HTMLElement} contactOverview - The element where contacts are rendered.
 */
function handleGroupChange(currentGroup, newGroup, contactOverview) {
    if (newGroup !== currentGroup) {
        if (currentGroup !== null) {
            closeGroup(contactOverview);
        }
        openGroup(newGroup, contactOverview);
    }
}


/**
 * Renders a contact item with circle and details.
 *
 * @param {HTMLElement} contactOverview - The element where contacts are rendered.
 * @param {string} groupInitial - The initial of the current group.
 * @param {string} circleStyle - The CSS style for the circle.
 * @param {string} circleClass - The class for the circle.
 * @param {string} contactInitials - The contact's initials.
 * @param {Object} contact - The contact information.
 */
function renderContactItem(contactOverview, circleStyle, circleClass, contactInitials, contact) {
    contactOverview.innerHTML += `<div class="contact-item">
                                    <div class="circle ${circleClass}" style="${circleStyle}">${contactInitials}</div>
                                    <div class="contact-details">
                                        <div>${contact.name}</div>
                                        <div>${contact.email}</div>
                                    </div>
                                </div>`;
}


/**
 * Calculates the contact initials based on name parts.
 *
 * @param {Array} nameParts - The parts of the contact's name.
 * @returns {string} - The calculated initials.
 */
function calculateContactInitials(nameParts) {
    return `${nameParts[0].charAt(0)}${nameParts[nameParts.length - 1].charAt(0)}`;
}


/**
 * Opens a new contact group.
 *
 * @param {string} newGroup - The new group.
 * @param {HTMLElement} contactOverview - The element where contacts are rendered.
 */
function openGroup(newGroup, contactOverview) {
    contactOverview.innerHTML += `<div class="contact-group">
                                    <div class="group-header">${newGroup}</div>
                                    <hr class="group-divider">`;
}

/**
 * Closes the current contact group.
 *
 * @param {HTMLElement} contactOverview - The element where contacts are rendered.
 */
function closeGroup(contactOverview) {
    contactOverview.innerHTML += `</div>`;
}


/**
 * Handles the last group and closes it if needed.
 *
 * @param {string} currentGroup - The current name group.
 * @param {HTMLElement} contactOverview - The element where contacts are rendered.
 */
function handleLastGroup(currentGroup, contactOverview) {
    if (currentGroup !== null) {
        closeGroup(contactOverview);
    }
}