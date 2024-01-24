contacts = [
    {
      name: "Alice Smith",
      email: "alice@example.com",
      phone: "+49 123 456789",
      color: "#3498db",
    },
    {
      name: "Bob Johnson",
      email: "bob@example.com",
      phone: "+49 234 567890",
      color: "#2ecc71",
    },
    {
      name: "Brad Williams",
      email: "brad@example.com",
      phone: "+49 345 678901",
      color: "#e74c3c",
    },
    {
      name: "Michael Davis",
      email: "michael@example.com",
      phone: "+49 456 789012",
      color: "#f39c12",
    },
    {
      name: "David Clark",
      email: "david@example.com",
      phone: "+49 567 890123",
      color: "#9b59b6",
    },
    {
      name: "Diana Martinez",
      email: "diana@example.com",
      phone: "+49 678 901234",
      color: "#1abc9c",
    },
    {
      name: "Eva Miller",
      email: "eva@example.com",
      phone: "+49 789 012345",
      color: "#3498db",
    },
    {
      name: "Sam Taylor",
      email: "sam@example.com",
      phone: "+49 890 123456",
      color: "#2ecc71",
    },
    {
      name: "Sara Brown",
      email: "sara@example.com",
      phone: "+49 901 234567",
      color: "#e74c3c",
    },
    {
      name: "Ross Wilson",
      email: "ross@example.com",
      phone: "+49 012 345678",
      color: "#f39c12",
    },
    {
      name: "Kate Moore",
      email: "kate@example.com",
      phone: "+49 345 678901",
      color: "#9b59b6",
    },
    {
      name: "Karl Lee",
      email: "karl@example.com",
      phone: "+49 567 890123",
      color: "#1abc9c",
    },
    {
      name: "John Turner",
      email: "john@example.com",
      phone: "+49 789 012345",
      color: "#3498db",
    },
  ];


/**
 * Stores data on the server using the specified key.
 *
 * @param {string} key - The key under which the data will be stored.
 * @param {string} value - The data to be stored.
 * @returns {Promise} - A promise that resolves to the server response in JSON format.
 */
async function setItemContacts(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, { method: "POST", body: JSON.stringify(payload) }).then((res) => res.json());
}


/**
* Retrieves data from the server using the specified key.
*
* @param {string} key - The key for which data is to be retrieved.
* @returns {Promise} - A promise that resolves to the retrieved data value from the server.
*/
async function getItemContacts(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url).then((res) => res.json()).then((res) => res.data.value);
}


/**
* Loads contacts from the server and updates the local 'contacts' array.
*/
async function loadContactsFromServer() {
  try {
      contacts = JSON.parse(await getItemContacts("contacts"));
  } catch (e) {
    console.error("Loading error:", e);
  }
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