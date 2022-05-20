const { readFile } = require("fs").promises;
const { generate } = require("shortid");
const { contactsPath, updateContactsList } = require("./helpers");

const listContacts = async () => {
  const data = await readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactId);
  return contact ? contact : null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }
  const newContactsList = contacts.filter((_, idx) => idx !== index);
  await updateContactsList(newContactsList);
  console.log(`Contact id: ${contactId} was add to contacts!`);
  return contacts[index];
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: generate(), name, email, phone };
  contacts.push(newContact);
  await updateContactsList(contacts);
  console.log(`Contact ${name} was add to contacts!`);
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
