const { Contact } = require("../../models/contacts");

const getAll = async (req, res) => {
  const { id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit: Number(limit),
  }).then((data) => {
    if (favorite === "false" || favorite === "true") {
      return data.filter((x) => {
        return x.favorite.toString() === favorite;
      });
    }
    return data;
  });

  res.json(result);
};

module.exports = getAll;
