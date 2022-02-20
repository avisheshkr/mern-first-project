import React, { useEffect, useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";
import * as FaIcons from "react-icons/fa";
import * as FcIcons from "react-icons/fc";

const Contact = () => {
  const [result, setResult] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // For recieving emails from contact form using emailjs
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_n1hybfj",
        "template_dms8tbu",
        form.current,
        "user_TUW2jkg3UCReCCgZWfpIm"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    setResult(true);
    setTimeout(() => setResult(false), 10000);

    // Post Contact Form details to database
    postContact(e);
  };
  // End

  const handleChange = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const getUserData = async () => {
    try {
      const res = await fetch("/getData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      const { name, email, phone, message } = data;
      setUserData({ ...userData, name, email, phone, message });

      if (res.status !== 200) {
        throw new Error("Data Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Post Contact Form details to database
  const postContact = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = userData;
    const res = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, message }),
    });

    const data = await res.json();

    if (res.status === 400 || !data) {
      window.alert("Message not sent");
    } else {
      window.alert("Message sent successfully");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <div className="upper-container">
        <div className="phone info">
          <span>
            <FcIcons.FcPhoneAndroid />
          </span>
          <div className="text">
            <p>Phone</p>
            <p>+977-2837823239</p>
          </div>
        </div>
        <div className="email info">
          <span>
            <FcIcons.FcFeedback />
          </span>
          <div className="text">
            <p>Email</p>
            <p>info@gmail.com</p>
          </div>
        </div>
        <div className="address info">
          <span>
            <FcIcons.FcBusinessContact />
          </span>
          <div className="text">
            <p>Address</p>
            <p>Saraswotikhel, ChanguNarayan-01, Bhaktapur</p>
          </div>
        </div>
      </div>
      <div className="container marg">
        <div className="inner-container extra-container">
          <h1>Get In Touch</h1>
          {result ? (
            <p style={{ paddingTop: "20px", color: "green" }}>
              Message sent successfully
            </p>
          ) : null}
          <form method="POST" ref={form}>
            <div className="field-container">
              <div className="field">
                <label htmlFor="name">
                  <FaIcons.FaUserAlt />
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your Name"
                  value={userData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label htmlFor="email">
                  <FaIcons.FaMailBulk />
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  value={userData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label htmlFor="phone">
                  <FaIcons.FaPhoneAlt />
                </label>
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  placeholder="Your Phone"
                  value={userData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field comment">
              <label htmlFor="message">
                <FaIcons.FaCommentDots />
              </label>
              <textarea
                name="message"
                rows="5"
                id="message"
                placeholder="Your Message"
                value={userData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" onClick={sendEmail}>
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
