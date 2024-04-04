import { log } from "console";
import * as fs from "fs/promises";
import * as path from "path";

const contactsPath = path.normalize("./db/contacts.json");

async function listContacts() {
  // ...твій код. Повертає масив контактів.
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data.toString());
  } catch (err) {
    console.log(err.message);
  }
}

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  try {
    const data = await fs.readFile(contactsPath);
    const records = JSON.parse(data.toString());
    const findRecord = records.find((record) => record.id === contactId);
    return findRecord ? findRecord : null;
  } catch (err) {
    console.log(err.message);
  }
}

async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  try {
    const data = await fs.readFile(contactsPath);
    const records = JSON.parse(data.toString());
    const findRecord = records.find((record) => record.id === contactId);
    const filteredRecords = records.filter((record) => record.id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(filteredRecords));
    return findRecord ? findRecord : null;
  } catch (err) {
    console.log(err.message);
  }
}

async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту (з id).
  try {
    const data = await fs.readFile(contactsPath);
    const records = JSON.parse(data.toString());
    const newRecord = {
      id: crypto.randomUUID(),
      name: name,
      email: email,
      phone: phone,
    };
    records.push(newRecord);
    fs.writeFile(contactsPath, JSON.stringify(records));
    return newRecord;
  } catch (err) {
    console.log(err.message);
  }
}

async function updateContact(contactId, name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    const records = JSON.parse(data.toString());
    const findRecord = records.find((record) => record.id === contactId);
    if (!findRecord) return null;
    const recordUpdate = {};
    if (name) recordUpdate.name = name;
    if (email) recordUpdate.email = email;
    if (phone) recordUpdate.phone = phone;

    const updatedRecord = { ...findRecord, ...recordUpdate };

    const updatedRecords = records.filter((record) => record.id !== contactId);
    updatedRecords.push(updatedRecord);
    fs.writeFile(contactsPath, JSON.stringify(updatedRecords));
    return updatedRecord;
  } catch (err) {
    console.log(err.message);
  }
}
export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
