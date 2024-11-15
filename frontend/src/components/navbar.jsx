import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css"; 

const Navbar = ({ user }) => {
  return (
    <div>
      <div className="bg-white shadow-sm">
        <div className="container py-2 d-flex justify-content-between align-items-center">
          <Link style={{textDecoration:"none"}} to="/" className="d-flex align-items-center me-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pinterest-logo.png/600px-Pinterest-logo.png"
              alt=""
              className="logo-img me-2"
            />
            <span className="text-danger fs-4 fw-bold">Pinterest</span>
          </Link>

          <div className="d-flex align-items-center gap-3">
            <Link to="/" className="text-secondary nav-link">
              Home
            </Link>
            <Link to="/create" className="text-secondary nav-link">
              Create
            </Link>
            <Link style={{textDecoration:"none"}}
              to="/account"
              className="account-circle d-flex justify-content-center align-items-center text-secondary"
            >
              {user.name.slice(0, 1)}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
