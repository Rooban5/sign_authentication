const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const crypto = require("crypto")
const authRoutes = require("./routes/AuthRoutes");
const cookieParser = require("cookie-parser");

const signupRoute = require("./routes/SignupRoute");
const userRoute = require("./routes/UserRoutes");
mongoose
  .connect(process.env.MONGO_LINK)
  .then(() => {
    console.log("Database Connected.....");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, 
  })
);

app.options('*', cors()); // Handle preflight requests for all routes

app.use(express.json());
app.use(bodyParser.json());

app.use("/signup", signupRoute);
app.use("/login", authRoutes);
app.use("/", userRoute);
app.listen(process.env.PORT, () => {
  console.log("Server is running at port " + process.env.PORT);
});
