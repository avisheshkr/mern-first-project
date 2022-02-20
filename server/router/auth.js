const express = require("express");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../model/userSchema");
const authenticate = require("../middlewares/authenticate");

router.get("/", (req, res) => {
  res.send("Hello Home from router server");
});

//Post Registration Form

router.post("/register", async (req, res) => {
  const { name, email, phone, password, confirmPassword } = req.body;

  try {
    if (!name || !email || !phone || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ message: "All fields are not filled properly" });
    }

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ message: "Users already exists" });
    } else if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    } else {
      const user = new User({ name, email, phone, password, confirmPassword });

      //Password hashing goes here

      await user.save();
      return res.status(201).json({ message: "User registered successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

// Get sign in Info, generate token in cookies for authentication
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are not filled" });
    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      let token = await userLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 2592000000),
        httpOnly: true,
      });

      if (isMatch) {
        res.json({ message: "User login successful" });
      } else {
        res.status(400).json({ message: "Invalid Credentials Password" });
      }
    } else {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
  }
});

//Authenticate and get About Page
router.get("/about", authenticate, (req, res) => {
  console.log("Hello About from the server");
  res.json(req.rootUser);
});

// Get all users data for Home page and Contact Page
router.get("/getData", authenticate, (req, res) => {
  res.json(req.rootUser);
  console.log("Data is received");
});

// Get contact form info from Contact Page
router.post("/contact", authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    // const mail = {
    //   from: name,
    //   to: "avishesh09401kr@gmail.com",
    //   subject: "Contact Form Submission",
    //   html: `<p>Name: ${name}</p>
    //   <p>Email: ${email}</p>
    //   <p>Message: ${message}</p>
    //   `,
    // };

    // contactEmail.sendMail(mail, (error) => {
    //   if (error) {
    //     res.json({ status: "Error" });
    //   } else {
    //     res.json({ status: "Message sent" });
    //   }
    // });

    if (!name || !email || !phone || !message) {
      console.log("Error in Contact form");
      return res.status(400).json({ message: "All fields are not filled" });
    }

    const userContact = await User.findOne({ _id: req.UserId });

    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );

      if (userMessage) {
        res.status(201).json({ message: "Message sent successfully" });
        // const transporter = nodemailer.createTransport({
        //   service: "gmail",
        //   auth: {
        //     user: email,
        //     pass: "admin",
        //   },
        //   tls: {
        //     rejectUnauthorized: false,
        //   },
        // });

        // // Step 2
        // const mailOptions = {
        //   from: `'Nodemailer contact' <${email}>`,
        //   to: "avishesh09401kr@gmail.com",
        //   subject: "Testing and testing",
        //   text: message,
        // };

        // // Step 3
        // transporter.sendMail(mailOptions, (err, data) => {
        //   if (err) {
        //     console.log(err);
        //   } else {
        //     console.log("Email sent!!!!!");
        //   }
        // });
      } else {
        res.status(400).json({ message: "Message not sent" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.send("Logout successfully");
  console.log("Logout successfully");
});

module.exports = router;
