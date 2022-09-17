const { Contact, newContacts } = require("../../models/contacts");

const { createError } = require("../../helpers");

const add = async (req, res) => {
  const body = req.body;
  const { error } = newContacts.validate(body);
  if (error) {
    throw createError(400, "Not found");
  }

  const { id: owner } = req.user;

  const result = await Contact.create({ ...body, owner });
  res.status(201).json(result);
};

module.exports = add;
