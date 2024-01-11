const contacts = [
    { name: 'Alice Smith', email: 'alice@example.com', phone: '+49 123 456789', color: '#3498db' },
    { name: 'Bob Johnson', email: 'bob@example.com', phone: '+49 234 567890', color: '#2ecc71' },
    { name: 'Brad Williams', email: 'brad@example.com', phone: '+49 345 678901', color: '#e74c3c' },
    { name: 'Michael Davis', email: 'michael@example.com', phone: '+49 456 789012', color: '#f39c12' },
    { name: 'David Clark', email: 'david@example.com', phone: '+49 567 890123', color: '#9b59b6' },
    { name: 'Diana Martinez', email: 'diana@example.com', phone: '+49 678 901234', color: '#1abc9c' },
    { name: 'Eva Miller', email: 'eva@example.com', phone: '+49 789 012345', color: '#3498db' },
    { name: 'Sam Taylor', email: 'sam@example.com', phone: '+49 890 123456', color: '#2ecc71' },
    { name: 'Sara Brown', email: 'sara@example.com', phone: '+49 901 234567', color: '#e74c3c' },
    { name: 'Ross Wilson', email: 'ross@example.com', phone: '+49 012 345678', color: '#f39c12' },
    { name: 'Kate Moore', email: 'kate@example.com', phone: '+49 345 678901', color: '#9b59b6' },
    { name: 'Karl Lee', email: 'karl@example.com', phone: '+49 567 890123', color: '#1abc9c' },
    { name: 'John Turner', email: 'john@example.com', phone: '+49 789 012345', color: '#3498db' }
];


/**
 * Renders contact overview section
 */
function renderContactBook() {
    const contactOverview = document.getElementById('contactOverviewContent');
    const sortedContacts = sortContactsAlphabetically();
    let currentAlphabetLetter = null;

    for (let i = 0; i < sortedContacts.length; i++) {
        const contact = sortedContacts[i];
        const contactFirstLetter = contact.name.charAt(0).toUpperCase();
        handleLetterChange(currentAlphabetLetter, contactFirstLetter, contactOverview);
        currentAlphabetLetter = contactFirstLetter;

        const circleStyle = `background-color: ${contact.color};`;
        const circleClass = `circle-${contact.name.charAt(0).toUpperCase()}`;
        const nameParts = contact.name.split(' ');
        const contactInitials = calculateContactInitials(nameParts);

        renderContactItem(contactOverview, circleStyle, circleClass, contactInitials, contact, i);
    }

    handleLastLetter(currentAlphabetLetter, contactOverview);
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
 * @param {string} currentAlphabetLetter - The current letter group.
 * @param {string} newLetter - The new letter group.
 * @param {HTMLElement} contactOverview - The element where contacts are rendered.
 */
function handleLetterChange(currentAlphabetLetter, newLetter, contactOverview) {
    if (newLetter !== currentAlphabetLetter) {
        openLetterGroup(newLetter, contactOverview);
    } else {
        closeLetterGroup(contactOverview);
    };
}


/**
 * Renders a contact item with circle and details.
 *
 * @param {HTMLElement} contactOverview - The element where contacts are rendered.
 * @param {string} circleStyle - The CSS style for the circle.
 * @param {string} circleClass - The class for the circle.
 * @param {string} contactInitials - The contact's initials.
 * @param {Object} contact - The contact information.
 * @param {number} index - The index of the contact.
 */
function renderContactItem(contactOverview, circleStyle, circleClass, contactInitials, contact, index) {
    const contactItemId = `contactItem_${index}`;
    const contactItemHTML = `
        <div id="${contactItemId}" class="contactItem" onclick="showContactDetails('${contactItemId}')">
            <div class="circle ${circleClass}" style="${circleStyle}">${contactInitials}</div>
            <div class="contactDetails">
                <div class="contactNameInOverview">${contact.name}</div>
                <div class="emailInOverview">${contact.email}</div>
            </div>
        </div>
    `;
    contactOverview.innerHTML += contactItemHTML;
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
 * @param {string} newLetter - The new letter group.
 * @param {HTMLElement} contactOverview - The element where contacts are rendered.
 */
function openLetterGroup(newLetter, contactOverview) {
    contactOverview.innerHTML += `<div class="contact-group">
                                    <div class="groupHeader">${newLetter}</div>
                                    <hr class="groupDivider">`;
}

/**
 * Closes the current contact group.
 *
 * @param {HTMLElement} contactOverview - The element where contacts are rendered.
 */
function closeLetterGroup(contactOverview) {
    contactOverview.innerHTML += `</div>`;
}


/**
 * Handles the last group and closes it if needed.
 *
 * @param {string} currentAlphabetLetter - The current name group.
 * @param {HTMLElement} contactOverview - The element where contacts are rendered.
 */
function handleLastLetter(currentAlphabetLetter, contactOverview) {
    if (currentAlphabetLetter !== null) {
        closeLetterGroup(contactOverview);
    }
}

/**
 * Shows contact details and toggles the 'selectedContact' class for the clicked contact item.
 *
 * @param {string} contactItemId - The ID of the contact item.
 */
function showContactDetails(contactItemId){
    toggleSelectedClass(contactItemId);
}

/**
 * Toggles the 'selectedContact' class for the clicked contact item and removes it from other items.
 *
 * @param {string} contactItemId - The ID of the contact item.
 */
function toggleSelectedClass(contactItemId) {
    const clickedItem = document.getElementById(contactItemId);

    clickedItem.classList.toggle('selectedContact');

    const contactItems = document.querySelectorAll('.contactItem');
    contactItems.forEach(function (item) {
        if (item !== clickedItem) {
            item.classList.remove('selectedContact');
        }
    });
}