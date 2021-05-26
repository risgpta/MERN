const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const router = express.Router();

const cors = require("cors");

var allowedOrigins = [
  "http://localhost:5000",
  "https://api-smartmanager.herokuapp.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },

    exposedHeaders: ["Content-Length", "X-Foo", "X-Bar"],

    credentials: true,
  })
);

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

//Middlewares
/*
app.use.(auth)
app.use('/about',() => {
    console.log('middleare...');
})
*/

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
//home route
app.get("/", (req, res) => {
  res.send("we are home !!!----");
});

//User Routes
const userRoute = require("./routes/user");
app.use("/users", userRoute);

//Task Routes
const taskRoute = require("./routes/task");
app.use("/tasks", taskRoute);

//Tag Routes
const tagRoute = require("./routes/tag");
app.use("/tags", tagRoute);
