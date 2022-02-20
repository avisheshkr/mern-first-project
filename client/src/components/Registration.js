import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import "./Registration.css";

const Registration = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    try {
      e.preventDefault();

      const { name, email, phone, password, confirmPassword } = user;

      const res = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, password, confirmPassword }),
      });

      const data = await res.json();

      if (res.status === 400 || !data) {
        window.alert("Invalid Registration");
        console.log("Invalid Registration");
      } else {
        window.alert("Successful Registration");
        console.log("Successful Registration");
        navigate("/signin");
        console.log(navigate);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container reg-container">
      <div className="inner-container">
        <h1>Sign up</h1>
        <form method="POST">
          <div className="field">
            <label htmlFor="name">
              <FaIcons.FaUserAlt />
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your Name"
              value={user.name}
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
              value={user.email}
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
              value={user.phone}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="password">
              <FaIcons.FaKey />
            </label>
            <input
              type="text"
              name="password"
              id="password"
              placeholder="Your Password"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="confirmPassword">
              <FaIcons.FaKey />
            </label>
            <input
              type="text"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Your Password"
              value={user.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button type="submit" onClick={postData}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
