import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/userContext";
import { LoadingAnimation } from "../components/loading";
// import { PinData } from "../context/PinContext";
import "../styles/login.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser, btnLoading } = UserData();
  const navigate = useNavigate();

//   const { fetchPins } = PinData();

  const submitHandler = (e) => {
    e.preventDefault();
    loginUser(email, password, navigate, 
        // fetchPins
    );
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="login-card p-4 shadow-lg">
        <div className="text-center mb-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pinterest-logo.png/600px-Pinterest-logo.png"
            alt="Pinterest"
            className="logo-img mb-2"
          />
          <h2 className="text-center mb-4">Log in to see more</h2>
        </div>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-danger w-100"
            disabled={btnLoading}
          >
            {btnLoading ?  <LoadingAnimation /> : "Log in"} 
          </button>
        </form>

        <div className="text-center mt-4">
          <div className="separator mb-3">
            {/* <div>OR</div> */}
          </div>
          <p>
            Not on Pinterest yet?{" "}
            <Link to="/register" className="text-danger">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
