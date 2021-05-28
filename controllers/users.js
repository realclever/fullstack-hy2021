const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

//retrieve all users
usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    author: 1,
    title: 1,
    url: 1,
  });

  res.json(users.map((user) => user.toJSON()));
});

//add a new user
usersRouter.post("/", async (req, res) => {
  const body = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  //password can't be undefined or shorter than 3 characters
  if (body.password.length < 3) {
    return res
      .status(400)
      .json({ error: "Password is too short (minimum is 3 characters)" });
  }

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();
  res.json(savedUser);
});

module.exports = usersRouter;
