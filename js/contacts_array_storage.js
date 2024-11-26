contacts = [
  // {
  //   name: "Alice Smith",
  //   email: "alice@example.com",
  //   phone: "+49 123 456789",
  //   color: "#3498db",
  // },
  // {
  //   name: "Bob Johnson",
  //   email: "bob@example.com",
  //   phone: "+49 234 567890",
  //   color: "#2ecc71",
  // },
  // {
  //   name: "Brad Williams",
  //   email: "brad@example.com",
  //   phone: "+49 345 678901",
  //   color: "#e74c3c",
  // },
  // {
  //   name: "Michael Davis",
  //   email: "michael@example.com",
  //   phone: "+49 456 789012",
  //   color: "#f39c12",
  // },
  // {
  //   name: "David Clark",
  //   email: "david@example.com",
  //   phone: "+49 567 890123",
  //   color: "#9b59b6",
  // },
  // {
  //   name: "Diana Martinez",
  //   email: "diana@example.com",
  //   phone: "+49 678 901234",
  //   color: "#1abc9c",
  // },
  // {
  //   name: "Eva Miller",
  //   email: "eva@example.com",
  //   phone: "+49 789 012345",
  //   color: "#3498db",
  // },
  // {
  //   name: "Sam Taylor",
  //   email: "sam@example.com",
  //   phone: "+49 890 123456",
  //   color: "#2ecc71",
  // },
  // {
  //   name: "Sara Brown",
  //   email: "sara@example.com",
  //   phone: "+49 901 234567",
  //   color: "#e74c3c",
  // },
  // {
  //   name: "Ross Wilson",
  //   email: "ross@example.com",
  //   phone: "+49 012 345678",
  //   color: "#f39c12",
  // },
  // {
  //   name: "Kate Moore",
  //   email: "kate@example.com",
  //   phone: "+49 345 678901",
  //   color: "#9b59b6",
  // },
  // {
  //   name: "Karl Lee",
  //   email: "karl@example.com",
  //   phone: "+49 567 890123",
  //   color: "#1abc9c",
  // },
  // {
  //   name: "John Turner",
  //   email: "john@example.com",
  //   phone: "+49 789 012345",
  //   color: "#3498db",
  // },
];

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