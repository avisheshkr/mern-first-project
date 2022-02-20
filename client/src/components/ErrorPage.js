import React from "react";
import "./ErrorPage.css";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="error">
      <h2 className="error__heading">we are sorry, page not found</h2>
      <p className="error__para">
        The page you are looking for might have been removed had its name
        changed or is temporarily unavailable
      </p>
      <Link to="/">
        <button>Back To Homepage</button>
      </Link>
    </div>
  );
};

export default ErrorPage;
