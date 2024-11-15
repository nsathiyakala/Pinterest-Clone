import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PinData } from "../context/pinContext";
import PinCard from "../components/PinCard";
import { UserData } from "../context/userContext";
import "../styles/userprofile.css"; 

const UserProfile = ({ user: loggedInUser }) => {
  const params = useParams();
  const [user, setUser] = useState([]);

  async function fetchUser() {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/${params.id}`);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  }

  const [isFollow, setIsFollow] = useState(false);

  const { followUser } = UserData();

  const followHander = () => {
    setIsFollow(!isFollow);
    followUser(user._id, fetchUser);
  };

  const followers = user.followers;

  useEffect(() => {
    if (followers && followers.includes(loggedInUser._id)) setIsFollow(true);
  }, [user]);

  const { pins } = PinData();

  let userPins;

  if (pins) {
    userPins = pins.filter((pin) => pin.owner === user._id);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="container">
      {user && (
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className="p-4 w-100">
            <div className="d-flex align-items-center justify-content-center">
              <div className="profile-picture d-flex align-items-center justify-content-center">
                {user.name && (
                  <span className="display-4 text-secondary">
                    {user.name.slice(0, 1)}
                  </span>
                )}
              </div>
            </div>

            <h1 className="text-center mt-3 font-weight-bold">{user.name}</h1>
            <p className="text-center text-muted mt-1">{user.email}</p>
            <p className="text-center text-muted mt-2">
              {user.followers && (
                <span>{user.followers.length} followers</span>
              )}{" "}
              |{" "}
              {user.following && (
                <span>{user.following.length} followings</span>
              )}
            </p>
            {user && user._id !== loggedInUser._id && (
              <div className="d-flex justify-content-center mt-3">
                <button
                  onClick={followHander}
                  className="btn btn-outline-secondary px-4"
                >
                  {isFollow ? "Unfollow" : "Follow"}
                </button>
              </div>
            )}
            <div className="mt-4 masonry-grid">
              {userPins && userPins.length > 0 ? (
                userPins.map((e) => <PinCard key={e._id} pin={e} />)
              ) : (
                <p className="text-center">No Pin Yet</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
