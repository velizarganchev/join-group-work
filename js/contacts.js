const contacts = [
  { name: "Alice", email: "alice@example.com" },
  { name: "Bob", email: "bob@example.com" },
  { name: "Brad", email: "brad@example.com" },
  { name: "Charlie", email: "charlie@example.com" },
  { name: "David", email: "david@example.com" },
  { name: "Diana", email: "diana@example.com" },
  { name: "Eva", email: "eva@example.com" },
  { name: "Frank", email: "frank@example.com" },
  { name: "Fiona", email: "fiona@example.com" },
  { name: "Grace", email: "grace@example.com" },
  { name: "Henry", email: "henry@example.com" },
  { name: "Isabel", email: "isabel@example.com" },
  { name: "John", email: "john@example.com" },
];

/**
 * Renders contact overview section
 */
function renderContactBook() {
  const contactOverview = document.getElementById("contactOverview");

  let currentGroup = null;

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    const initial = contact.name.charAt(0).toUpperCase();

    if (initial !== currentGroup) {
      currentGroup = initial;

      contactOverview.innerHTML += `<div class="contact-group">
                                            <div class="group-header">${currentGroup}</div>`;
    }

    contactOverview.innerHTML += `<div class="contact-item">
                                        <div>${contact.name}</div>
                                        <div>${contact.email}</div>
                                    </div>`;
  }
}
