import React, { useState, useContext } from "react";
import * as FaIcons from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Login = () => {
  const { state, dispatch } = useContext(UserContext);

  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const postSignInData = async (e) => {
    try {
      e.preventDefault();

      const { email, password } = user;

      const res = await fetch("/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.status === 400 || !data) {
        window.alert("Invalid Login");
      } else {
        dispatch({ type: "USER", payload: true });
        window.alert("Successful Login, Welcome");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="inner-container">
        <h1>Sign In</h1>
        <form method="POST">
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

          <button type="submit" onClick={postSignInData}>
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
