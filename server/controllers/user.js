const User = require("../models/user");

const handleGetAllUsers = async (req, res) => {
  try {
    let page = Number(req.query.page) || 0;
    let limit = Number(req.query.limit) || 3;

    const allUser = await User.find({})
      .skip(page * limit)
      .limit(limit);

    const totalUsers = await User.find({});
    const len = totalUsers.length / limit;

    if (!allUser) return res.status(404).json({ error: "No user present" });
    return res.status(200).json({ allUser, total: Math.ceil(len) });
  } catch (error) {
    console.log(error);
  }
};

const handleAddNewUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;

    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const alreadyExist = await User.findOne({ email });
    if (alreadyExist)
      return res.status(404).json({ error: "User already exist" });

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      phone,
      status: "Active",
    });
    return res.status(201).send({ success: "User created" });
  } catch (error) {
    console.log(error);
  }
};

const handleDeleteUser = async (req, res) => {
  const { email } = req.body;

  const userToBeDeleted = await User.findOne({ email });

  if (!userToBeDeleted)
    return res.status(404).json({ error: "User not found" });

  const deletedUser = await User.findByIdAndDelete(userToBeDeleted._id);
  return res.status(200).json({ success: "User Deleted", deletedUser });
};

module.exports = { handleAddNewUser, handleGetAllUsers, handleDeleteUser };
