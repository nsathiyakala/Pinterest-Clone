import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/userContext";
import { LoadingAnimation } from "../components/loading";
// import { PinData } from "../context/PinContext";
import "../styles/register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { registerUser, btnLoading } = UserData();
  const navigate = useNavigate();

//   const { fetchPins } = PinData();

  const submitHandler = (e) => {
    e.preventDefault();
    registerUser(name, email, password, navigate, 
        // fetchPins
    );
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="bg-white p-4 rounded shadow w-100 max-w-400">
        <div className="text-center mb-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pinterest-logo.png/600px-Pinterest-logo.png"
            alt="Pinterest"
            className="logo-img mb-2"
          />
        </div>
        <h2 className="text-center mb-4">Register to Pinterest</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="form-control common-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control common-input"
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
              className="form-control common-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-danger w-100 common-btn"
            disabled={btnLoading}
          >
            {btnLoading ? <LoadingAnimation /> : "Register" } 
          </button>
        </form>
        <div className="text-center mt-4">
          <div className="separator my-3">
            {/* <span>OR</span> */}
          </div>
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-danger text-decoration-underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
