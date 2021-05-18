const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const router = express.Router();

const cors = require("cors");

var corsOptions = {
  origin: "http://localhost:5000",
};

app.use(cors(corsOptions));

app.use(express.json());

//connect to DB
console.log(process.env.DB_CONNECTION);
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(console.log("connected"))
  .catch((err) => console.log(err));

//listen
app.listen(5000, () => console.log(`Server running on port 5000`));

//User Routes
const userRoute = require("./routes/user");
app.use("/users", userRoute);

//Task Routes
const taskRoute = require("./routes/task");
app.use("/tasks", taskRoute);

//Tag Routes
const tagRoute = require("./routes/tag");
app.use("/tags", tagRoute);
