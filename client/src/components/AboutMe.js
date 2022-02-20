import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AboutMe.css";

const AboutMe = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const authenticateAndLogin = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
      setUserData(data);

      if (res.status !== 200) {
        throw new Error("Invalid");
      }
    } catch (error) {
      console.log(error);
      navigate("/signin");
    }
  };

  useEffect(() => {
    authenticateAndLogin();
  }, []);

  return (
    <div className="about-container" method="GET">
      <div className="about">
        <div className="info-title">
          <div className="info-title__image">
            <img
              src={`${
                userData.name === "Avishesh Karki"
                  ? "images/profile.jpg"
                  : "images/profile2.jpg"
              }`}
              alt=""
            />
          </div>
          <div>
            <p>Youtuber</p>
            <p>Instagram</p>
            <p>Thapa Technical</p>
            <p>WebsiteGithubMERN Dev</p>
            <p>Web Developer</p>
            <p>Figma</p>
            <p>Software Engineer</p>
          </div>
        </div>
        <div className="info-desc">
          <div className="info-desc__head">
            <div className="info-desc__heading">
              <h4>{userData.name}</h4>
              <h5>Web Developer</h5>
              <p>
                rankings: <span>1/10</span>
              </p>
            </div>
            <button className="info-desc__edit">Edit Profile</button>
          </div>
          <ul className="info-desc__about">
            <li>About</li>
            <li>Timeline</li>
          </ul>
          <div className="info-desc__full-info">
            <ul>
              <li>User Id</li>
              <li>Name</li>
              <li>Email</li>
              <li>Phone</li>
              <li>Profession</li>
            </ul>
            <ul>
              <li>{userData._id}</li>
              <li>{userData.name}</li>
              <li>{userData.email}</li>
              <li>{userData.phone}</li>
              <li>Web Developer</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
