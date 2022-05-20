const { writeFile } = require("fs").promises;
const contactsPath = require("./contactsPath");

const updateContactsList = async (newList) => {
  await writeFile(contactsPath, JSON.stringify(newList));
};

module.exports = updateContactsList;
