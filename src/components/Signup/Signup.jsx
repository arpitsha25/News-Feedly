import React, { useState } from "react";
import "../Login/Login.css";
import "./Signup.css";
import { Link } from "react-router-dom";
const Signup = () => {
  const [signupdata, setsignupdata] = useState({
    name: "",
    contact: "",
    email: "",
    password: "",
  });
  function handlesignup() {
    console.log("handle signup", signupdata);
  }
  return (
    <div className="container">
      <div className="inner-container">
        <div className="inner-container2">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={signupdata.name}
            onChange={(e) => {
              setsignupdata({ ...signupdata, [e.target.name]: e.target.value });
            }}
          />

          <input
            type="number"
            placeholder="Contact"
            name="contact"
            value={signupdata.contact}
            onChange={(e) => {
              setsignupdata({ ...signupdata, [e.target.name]: e.target.value });
            }}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={signupdata.email}
            onChange={(e) => {
              setsignupdata({ ...signupdata, [e.target.name]: e.target.value });
            }}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={signupdata.password}
            onChange={(e) => {
              setsignupdata({ ...signupdata, [e.target.name]: e.target.value });
            }}
          />

          <button className="btn" onClick={handlesignup}>Signup</button>
          <p>
            Already have an account?
            <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
