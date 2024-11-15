import React from "react";
import { PinData } from "../context/pinContext";
import PinCard from "../components/PinCard";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/userContext";
import '../styles/Account.css';

const Account = ({ user }) => {
    const navigate = useNavigate();
    const { setIsAuth, setUser } = UserData();
    const logoutHandler = async () => {
        try {
            const { data } = await axios.get(process.env.REACT_APP_API_URL +"/logout");
            toast.success(data.message);
            navigate("/login");
            setIsAuth(false);
            setUser([]);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const { pins } = PinData();

    let userPins;

    if (pins) {
        userPins = pins.filter((pin) => pin.owner === user._id);
    }
    return (
        <div className="account-container">
            <div className="d-flex flex-column align-items-center justify-content-center">
                <div className="p-4 w-100">
                    <div className="d-flex align-items-center justify-content-center">
                        <div className="profile-picture d-flex align-items-center justify-content-center">
                            <span className="display-4 text-secondary">
                                {user.name.slice(0, 1)}
                            </span>
                        </div>
                    </div>

                    <h1 className="text-center mt-3 font-weight-bold">{user.name}</h1>
                    <p className="text-center text-muted mt-1">{user.email}</p>
                    <div className="d-flex justify-content-center mt-3">
                        <button onClick={logoutHandler} className="btn btn-secondary px-4">
                            Logout
                        </button>
                    </div>

                    <div className="mt-4 masonry-grid">
                        {userPins && userPins.length > 0 ? (
                            userPins.map((e) => (
                                <div className="masonry-item" key={e._id}>
                                    <PinCard pin={e} />
                                </div>
                            ))
                        ) : (
                            <p>No Pin Yet</p>
                        )}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Account;
