contacts = [];

/**
* Loads contacts from the server and updates the local 'contacts' array.
*/
async function loadContactsFromServer() {
  contacts = await getData('contacts');
}

/**
* Saves a new contact to the server and updates the local 'contacts' array.
*
* @param {Object} newContact - The contact object to be saved.
*/
async function saveContactsToServer(newContact) {
  contacts.push(newContact);
  await setItemContacts("contacts", JSON.stringify(contacts));
}