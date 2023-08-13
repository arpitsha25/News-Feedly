import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [logindata, setlogindata] = useState({ email: "", password: "" });
  const [rs, setrs] = useState("");
  const navigate = useNavigate();

  function handlelogin() {
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logindata),
    })
      .then((response) => response.json())
      .then((result) => {
        alert(result.msg);
        setrs(result.msg);
      });
  }
  useEffect(() => {
    if (rs === "success") {
      navigate("/homepage");
    }
  }, [rs]);
  return (
    <div className="container">
      <div className="inner-container">
        <div className="inner-container2">
          <h1>News Feedly</h1>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={logindata.email}
            onChange={(e) => {
              setlogindata({ ...logindata, [e.target.name]: e.target.value });
            }}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={logindata.password}
            onChange={(e) => {
              setlogindata({ ...logindata, [e.target.name]: e.target.value });
            }}
          />

          <button className="btn" onClick={handlelogin}>
            Login
          </button>
          <p>
            Dont have account?
            <Link to="/signup">Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
