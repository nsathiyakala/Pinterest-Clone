import React, { useEffect, useState } from "react";
import { Link, 
     useParams } from "react-router-dom";
import { PinData } from "../context/pinContext";
import { Loading } from "../components/loading";
import { MdDelete } from "react-icons/md";
import "../styles/pinpage.css"; 

const PinPage = ({ user }) => {
  const params = useParams();
  const {
    loading,
    fetchPin,
    pin,
    addComment,
    deleteComment,
  } = PinData();



  const [comment, setComment] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    addComment(pin._id, comment, setComment);
  };

  /* eslint-disable no-restricted-globals */
  const deleteCommentHander = (id) => {
    if (confirm("Are you sure you want to delete this comment"))
      deleteComment(pin._id, id);
  };


  useEffect(() => {
    fetchPin(params.id);
  }, [params.id]);

  return (
    <div className="container py-4">
      {pin && (
        <div className="d-flex flex-column align-items-center bg-light p-4 min-vh-100">
          {loading ? (
            <Loading />
          ) : (
            <div className="card w-100 shadow-lg">
              <div className="row no-gutters">
                <div className="col-12 col-md-6 bg-secondary d-flex align-items-center justify-content-center">
                  {pin.image && (
                    <img
                      src={pin.image.url}
                      alt=""
                      className="img-fluid rounded-t-lg rounded-md-start"
                    />
                  )}
                </div>

                <div className="col-12 col-md-6 p-4">
                  <div className="d-flex justify-content-between mb-4">
                      <h1 className="h3">{pin.title}</h1>
                  </div>

                    <p className="mb-4">{pin.pin}</p>
                  

                  {pin.owner && (
                    <div className="d-flex align-items-center mb-4">
                      <Link to={`/user/${pin.owner._id}`}>
                        <div className="rounded-circle bg-gray-300 d-flex justify-content-center align-items-center">
                          <span className="font-weight-bold text-white">
                            {pin.owner.name.slice(0, 1)}
                          </span>
                        </div>
                      </Link>
                      <div className="ml-3">
                        <h5 className="mb-1">{pin.owner.name}</h5>
                        <p className="text-muted">
                          {pin.owner.followers.length} Followers
                        </p>
                      </div>
                    </div>
                  )}

                  <form className="d-flex mb-4" onSubmit={submitHandler}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                    />
                    <button type="submit" className="btn btn-danger ml-2">
                      Add+
                    </button>
                  </form>

                  <hr className="my-4" />

                  <div className="comments-container" style={{ maxHeight: "300px", overflowY: "auto" }}>
                    {pin.comments && pin.comments.length > 0 ? (
                      pin.comments.map((e, i) => (
                        <div className="d-flex justify-content-between mb-4" key={i}>
                          <div className="d-flex align-items-center">
                            <Link to={`/user/${e.user}`}>
                              <div className="rounded-circle bg-gray-300 d-flex justify-content-center align-items-center">
                                <span className="font-weight-bold text-white">
                                  {e.name.slice(0, 1)}
                                </span>
                              </div>
                            </Link>
                            <div className="ml-3">
                              <h5 className="mb-1">{e.name}</h5>
                              <p className="text-muted">{e.comment}</p>
                            </div>
                          </div>

                          {e.user === user._id && (
                            <button
                              onClick={() => deleteCommentHander(e._id)}
                              className="btn btn-danger"
                            >
                              <MdDelete />
                            </button>
                          )}
                        </div>
                      ))
                    ) : (
                      <p>No comments yet. Be the first one to comment.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PinPage;
