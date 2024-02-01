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
    let contactItemId = `contactItem_${index}`;
    let contactItemHTML = `
          <div id="${contactItemId}" class="contactItem" onclick="showContactDetails('${contactItemId}', true)">
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
* Generates HTML for the "Add new contact" button.
*/
function renderAddContactButton() {
    let addContactButtonHTML = `
      <button id="addContactButton" onclick="addContact()">
        Add new contact <img src="/assets/img/add-contact.png" alt="add contact image">
      </button>
    `;
    return addContactButtonHTML;
  }

  
/**
 * Renders the detailed view of a contact, including name, buttons, and contact information.
 *
 * @param {Object} contact - The contact information.
 * @param {boolean} toEdit - True if in edit mode.
 */
function renderContactDetails(contact, toEdit) {
    let contactDetailsView = document.getElementById("contactDetailsView");
    contactDetailsView.innerHTML = "";

    let contactDetailsHTML = `
        <div class="contactDetailsName">
            <div class="circle circleInDetailView" style="background-color: ${contact.color};">
                ${calculateContactInitials(contact.name.split(" "))}
            </div>
            <div class="contactDetailsNameAndButtons">
                <div class="contactDetailsNameFull">${contact.name}</div>
                <div class="contactNameIcons">
                    ${renderEditDeleteButtons()}
                </div>
            </div>
        </div>
        <p class="contactInformation">Contact Information</p>
        <div class="emailAndPhoneDetails">
            <p id="emailDetails"><b>Email</b></p>
            <div class="emailDetails"><a href="mailto:${contact.email}">${contact.email}</a></div>
            <p><b>Phone</b></p>
            <div class="phoneDetails"><a href="tel:${contact.phone}">${contact.phone}</a></div>
        </div>
    `;

    contactDetailsView.innerHTML = contactDetailsHTML;

    if (toEdit) {
        renderEditFields(contact);
    }

    document.getElementById("responsiveContactDetailBack").setAttribute('style', 'display:none !important');
}


/**
 * Renders the edit fields with the contact's information for editing.
 *
 * @param {Object} contact - The contact information.
 */
function renderEditFields(contact) {
    let editNameField = document.getElementById("editName");
    let editEmailField = document.getElementById("editEmail");
    let editPhoneField = document.getElementById("editPhone");

    editNameField.value = contact.name;
    editEmailField.value = contact.email;
    editPhoneField.value = contact.phone;

    let initialIcon = document.getElementById("iconInEditContact");
    initialIcon.innerHTML = `
        <div class="circle circleInDetailView responsiveCircle" style="background-color: ${contact.color};">
            ${calculateContactInitials(contact.name.split(" "))}
        </div>
    `;
}


/**
 * Renders the buttons for editing and deleting a contact.
 *
 * @returns {string} - HTML for the edit and delete buttons.
 */
function renderEditDeleteButtons() {
    return `
        <div class="contactEditButton" onclick="editContact()">
            <img class="contactDetailsNameIcons" src="/assets/img/edit-contact.png" alt="edit contact">
            <p>Edit</p>
        </div>
        <div class="contactDeleteButton" onclick="deleteContact()">
            <img class="contactDetailsNameIcons" src="/assets/img/delete-contact.png" alt="delete contact">
            <p>Delete</p>
        </div>
    `;
}


/**
 * Creates a loading animation for the save button, disabling it and displaying a loader.
 *
 * @param {HTMLElement} saveButton - The save button element.
 */
function createLoadingAnimation(saveButton) {
    saveButton.disabled = true;
    saveButton.style.justifyContent = 'center';
    saveButton.innerHTML = '<div class="loader"></div>';
}


/**
 * Resets the save button after loading animation, enabling it and setting the default content.
 *
 * @param {HTMLElement} saveButton - The save button element.
 */
function resetSaveButton(saveButton) {
    saveButton.disabled = false;
    saveButton.innerHTML = 'Create Contact <img src="/assets/img/check.png" alt="confirm icon">';
    saveButton.style.justifyContent = 'space-between';
}