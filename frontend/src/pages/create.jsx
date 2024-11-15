import React, { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { PinData } from "../context/pinContext";
import { useNavigate } from "react-router-dom";
import '../styles/create.css'; 

const Create = () => {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const [file, setFile] = useState("");
  const [filePrev, setFilePrev] = useState("");
  const [title, setTitle] = useState("");
  const [pin, setPin] = useState("");
  const { addPin } = PinData();

  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setFilePrev(reader.result);
      setFile(file);
    };
  };

  const navigate = useNavigate();

  const addPinHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("pin", pin);
    formData.append("file", file);

    addPin(formData, setFilePrev, setFile, setTitle, setPin, navigate);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        {/* File Upload Section */}
        <div className="col-md-5 col-lg-4">
          <div className="card shadow-lg p-4">
            {filePrev && (
              <img src={filePrev} alt="Preview" className="img-fluid mb-3 rounded" />
            )}
            <div
              className="d-flex flex-column align-items-center cursor-pointer"
              onClick={handleClick}
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="d-none"
                onChange={changeFileHandler}
              />
              <div className="rounded-circle bg-light d-flex align-items-center justify-content-center upload-icon">
                <FaPlus />
              </div>
              <p className="text-muted mt-2">Choose a file</p>
            </div>
            <p className="text-muted small mt-3">
              We recommend using high-quality .jpg files but less than 10MB.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="col-md-7 col-lg-6">
          <div className="card shadow-lg p-4">
            <form onSubmit={addPinHandler}>
              <div className="mb-4">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="pin" className="form-label">
                  Pin
                </label>
                <input
                  type="text"
                  id="pin"
                  className="form-control"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Add +
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
