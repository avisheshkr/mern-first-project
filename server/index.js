const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
// const nodemailer = require("nodemailer");

const app = express();

app.use(cookieParser());

dotenv.config({ path: "./config.env" });
require("./db/conn");
app.use(express.json());
app.use(require("./router/auth"));

// const contactEmail = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "***************@gmail.com",
//     pass: "********",
//   },
// });

// contactEmail.verify((error) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Ready to Send");
//   }
// });

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello Home from the server");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
