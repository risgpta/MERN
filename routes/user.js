const express = require("express");
const router = express.Router();
const User = require("../models/User");

//Check username
router.get("/check/:username", async (req, res) => {
  try {
    const users = await User.find({ username: req.params.username });
    if (users.length) res.json({ available: "false" });
    else res.json({ available: "true" });
  } catch (err) {
    res.json({ message: err });
  }
});

//Get users
router.get("/login/:username/:password", async (req, res) => {
  try {
    const users = await User.find({
      username: req.params.username,
      password: req.params.password,
    });
    if (users.length) res.json({ login: "success", userDetails: users[0] });
    else res.status(404).json({ login: "fail" });
  } catch (err) {
    res.json({ message: err });
  }
});

//Get users
router.get("/get", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

//Get user by user_id
router.get("/get/:user_id", async (req, res) => {
  console.log(req.params.user_id);
  try {
    const users = await User.find({ _id: req.params.user_id });
    console.log(users);
    if (users.length) res.json(users);
    else res.json({ error: "No such Id exists" });
  } catch (err) {
    res.json({ message: err });
  }
});

//Update user by user_id
router.put("/update/:user_id", async (req, res) => {
  console.log(req.params.user_id);
  try {
    await User.findByIdAndUpdate(
      req.params.user_id,
      req.body,
      function (err, data) {
        if (err) {
          console.log(err);
        } else {
          res.send(req.body);
          console.log("Data updated!");
        }
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
});

//Delete user by user_id
router.delete("/delete/:user_id", async (req, res) => {
  console.log(req.params.user_id);

  try {
    await User.findByIdAndRemove(req.params.user_id, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
        console.log("Data deleted!");
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//Create user
router.post("/create", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
