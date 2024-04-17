import contactsService from "../services/contactsServices.js";
import {
  createContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
} from "../schemas/contactsSchemas.js";

export const getAllContacts = async (req, res) => {
  const allContacts = await contactsService.listContacts();
  console.log(allContacts);
  res.status(200).send(allContacts);
};

export const getOneContact = async (req, res) => {
  const contact = await contactsService.getContactById(req.params.id);
  console.log(contact);
  if (contact) {
    res.status(200).send(contact);
  } else {
    res.status(404).send({ message: "Not found" });
  }
};

export const deleteContact = async (req, res) => {
  const contact = await contactsService.removeContact(req.params.id);
  console.log(contact);
  if (contact) {
    res.status(200).send(contact);
  } else {
    res.status(404).send({ message: "Not found" });
  }
};

export const createContact = async (req, res) => {
  const newContact = req.body;
  const { error, value } = createContactSchema.validate(newContact);

  if (!error) {
    const createdContact = await contactsService.addContact(
      newContact.name,
      newContact.email,
      newContact.phone
    );
    res.status(201).send(createdContact);
  } else {
    res.status(400).send({ message: error.message });
  }
};

export const updateContact = async (req, res) => {
  const contactUpdate = req.body;
  if (!contactUpdate.name && !contactUpdate.email && !contactUpdate.phone) {
    res.status(400).send({ message: "Body must have at least one field" });
    return;
  }
  const { error, value } = updateContactSchema.validate(contactUpdate);

  if (!error) {
    const updatedContact = await contactsService.updateContact(
      req.params.id,
      contactUpdate.name,
      contactUpdate.email,
      contactUpdate.phone
    );
    if (updatedContact) {
      res.status(200).send(updatedContact);
    } else {
      res.status(404).send({ message: "Not found" });
    }
  } else {
    res.status(400).send({ message: error.message });
  }
};

export const updateStatusContact = async (req, res) => {
  const contactUpdate = req.body;

  if (contactUpdate.favorite === undefined) {
    res.status(400).send({ message: "Body must have favorite field" });
    return;
  }
  const { error, value } = updateStatusContactSchema.validate(contactUpdate);

  if (!error) {
    const updatedContact = await contactsService.updateStatusContact(
      req.params.id,
      contactUpdate.favorite
    );
    if (updatedContact) {
      res.status(200).send(updatedContact);
    } else {
      res.status(404).send({ message: "Not found" });
    }
  } else {
    res.status(400).send({ message: error.message });
  }
};
