import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PinData } from "../context/pinContext";
import { Loading } from "../components/loading";
import { MdDelete, MdFavoriteBorder, MdFavorite } from "react-icons/md";
import toast from "react-hot-toast";
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
  const [liked, setLiked] = useState(false); 

  const submitHandler = (e) => {
    e.preventDefault();
    addComment(pin._id, comment, setComment);
  };

   /* eslint-disable no-restricted-globals */
  const deleteCommentHander = (id) => {
    if (confirm("Are you sure you want to delete this comment"))
      deleteComment(pin._id, id);
  };

  const toggleLike = () => {
    setLiked(!liked);
    if(!liked){
      toast.success('You like this pin!');
    }
    else 
    toast.error('You Unliked this pin!');
    
  };

  useEffect(() => {
    fetchPin(params.id);
  }, [params.id]);

  return (
    <div className="container py-4">
      {pin && (
        <div className="d-flex flex-column align-items-center p-4 min-vh-100">
          {loading ? (
            <Loading />
          ) : (
            <div className="card w-100 shadow-lg">
              <div className="row no-gutters">
                <div className="col-12 col-md-6  d-flex align-items-center justify-content-center">
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
                    <button onClick={toggleLike} className="btn">
                      {liked ? (
                        <MdFavorite size={24} color="red" />
                      ) : (
                        <MdFavoriteBorder size={24} />
                      )}
                    </button>
                  </div>

                  <p className="mb-4">{pin.pin}</p>

                  {pin.owner && (
                    <div className="d-flex align-items-center mb-4">
                      <Link to={`/user/${pin.owner._id}`} style={{textDecoration:"none"}}>
                        <div className="rounded-circle bg-gray-300 d-flex justify-content-center align-items-center">
                          <span className="font-weight-bold text-white">
                            {pin.owner.name.slice(0, 1)}
                          </span>
                        </div>
                      </Link>
                      <div className="ml-3" style={{marginLeft:"20px"}} >
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
                    <button type="submit" className="btn btn-danger ml-2" style={{marginLeft:"20px"}}>
                      Add+
                    </button>
                  </form>

                  <hr className="my-4" />

                  <div className="comments-container" style={{ maxHeight: "300px", overflowY: "auto" }}>
                    {pin.comments && pin.comments.length > 0 ? (
                      pin.comments.map((e, i) => (
                        <div className="d-flex justify-content-between mb-4" key={i}>
                          <div className="d-flex align-items-center">
                            <Link to={`/user/${e.user}`} style={{textDecoration:"none"}}>
                              <div className="rounded-circle bg-gray-300 d-flex justify-content-center align-items-center">
                                <span className="font-weight-bold text-white">
                                  {e.name.slice(0, 1)}
                                </span>
                              </div>
                            </Link>
                            <div className="ml-3" style={{marginLeft:"20px"}}>
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
