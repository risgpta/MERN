const express = require("express");
const Tag = require("../models/tag");
const router = express.Router();

//Create tag
router.post("/create", async (req, res) => {
  const tag = new Tag(req.body);
  console.log(tag);
  try {
    await tag.save();
    res.send(tag);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Get tags
router.get("/get/:userId", async (req, res) => {
  try {
    const tag = await Tag.find({ userId: req.params.userId });
    res.json(tag);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update tag by id
router.put("/update/:id", async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  try {
    await Tag.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.send(req.body);
        console.log("Data updated!");
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
