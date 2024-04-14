import { log } from "console";
import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

const Contact = mongoose.model("contact", contactsSchema, "contacts");

async function listContacts() {
  try {
    const data = await Contact.find();
    return data;
  } catch (err) {
    console.log(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await Contact.findOne({ _id: contactId });
    return data;
  } catch (err) {
    console.log(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    return deletedContact ? deletedContact : null;
  } catch (err) {
    console.log(err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const newRecord = {
      name: name,
      email: email,
      phone: phone,
    };
    const newContact = await Contact.create(newRecord);
    return newContact;
  } catch (err) {
    console.log(err.message);
  }
}

async function updateContact(contactId, name, email, phone) {
  try {
    const recordUpdate = {};
    if (name) recordUpdate.name = name;
    if (email) recordUpdate.email = email;
    if (phone) recordUpdate.phone = phone;
    const updatedRecord = await Contact.findByIdAndUpdate(
      contactId,
      recordUpdate,
      {
        new: true,
      }
    );
    return updatedRecord;
  } catch (err) {
    console.log(err.message);
  }
}

async function updateStatusContact(contactId, favorite) {
  try {
    const recordUpdate = {};
    if (favorite) recordUpdate.favorite = favorite;
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      recordUpdate,
      {
        new: true,
      }
    );
    return updatedContact;
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
  updateStatusContact,
};
