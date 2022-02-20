import React, { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {
  const [userName, setUserName] = useState("");

  const getUserData = async () => {
    const res = await fetch("/getData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    const { name } = data;

    setUserName(name);
    console.log(data);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="home-container">
      <h3>Welcome</h3>
      {userName ? (
        <div>
          <h1 className="home-container__heading">{userName}</h1>
          <p className="home-container__para">We are happy to see you back</p>
        </div>
      ) : (
        <h2>We Are The MERN Developer</h2>
      )}
    </div>
  );
};

export default Home;
