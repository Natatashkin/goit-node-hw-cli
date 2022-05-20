const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await listContacts();
      console.table(contactsList);
      break;

    case "get":
      try {
        const contact = await getContactById(id);
        if (!contact) {
          throw Error(`Contact with id: "${id}" does not exist!`);
        }
        console.log(contact);
      } catch (error) {
        console.warn(error.message);
      }
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      try {
        const deletedContact = await removeContact(id);
        if (!deletedContact) {
          throw Error(`Contact with id: "${id}" does not exist!`);
        }
        console.log(deletedContact);
      } catch (error) {
        console.warn(error.message);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).parserConfiguration({
  "parse-numbers": false,
}).argv;

invokeAction(argv);
