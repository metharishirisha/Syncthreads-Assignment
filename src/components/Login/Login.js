import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import './Login.css'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://synchthreads-backend.onrender.com/api/login", { username, password });
      console.log("Login Response:", response.data); 
      Cookies.set("token", response.data.token, { expires: 1 }); // Expires in 1 day
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error.response ? error.response.data : error.message);
        alert("Invalid credentials");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <input className="form-control" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input className="form-control mt-2" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button className="btn btn-primary mt-3" onClick={handleLogin}>Login</button>
      <p className="primary">username: mani</p>
      <p className="primary">password: mani123</p>
  </div>
  );
};

export default Login;
