import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
const Login = () => {
  const [logindata, setlogindata] = useState({ email: "", password: "" });
  function handlelogin(){
    console.log("handle login" , logindata)
  }
  return (
    <div className="container">
      <div className="inner-container">
        <div className="inner-container2">
          <input 
          type="email" 
          placeholder="Email" 
          name="email"
          value={logindata.email}
          onChange={(e)=>{setlogindata({...logindata , [e.target.name] : e.target.value})}}
          />

          <input 
          type="password" 
          placeholder="Password" 
          name="password"
          value={logindata.password}
          onChange={(e)=>{setlogindata({...logindata, [e.target.name] : e.target.value})}}
          />
          <button className="btn" onClick={handlelogin}>Login</button>
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
