const express = require("express");
const History_Task = require("../models/History_Task");
const Task = require("../models/Task");
const router = express.Router();

//Create task
router.post("/create", async (req, res) => {
  const task = new History_Task(req.body);
  console.log(task);
  try {
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Get Tasks
router.get("/get/:userId", async (req, res) => {
  try {
    const task = await History_Task.find({ userId: req.params.userId });
    res.json(task);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update task by id
router.put("/update/:id", async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  try {
    await History_Task.findByIdAndUpdate(
      req.params.id,
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

module.exports = router;
