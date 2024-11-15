import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

axios.defaults.withCredentials = true;

const PinContext = createContext();

export const PinProvider = ({ children }) => {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchPins() {
    try {
      const { data } = await axios.get(process.env.REACT_APP_API_URL + "/allPins", { withCredentials: true });

      setPins(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const [pin, setPin] = useState([]);

  async function fetchPin(id) {
    setLoading(true);
    try {
      const { data } = await axios.get(process.env.REACT_APP_API_URL + "/pin/" + id);

      setPin(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function addComment(id, comment, setComment) {
    try {
      const { data } = await axios.post(process.env.REACT_APP_API_URL + "/comment/" + id, { comment });
      toast.success(data.message);
      fetchPin(id);
      setComment("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function deleteComment(id, commentId) {
    try {
      const { data } = await axios.delete(
        ` ${process.env.REACT_APP_API_URL}/comment/${id}?commentId=${commentId}`
      );
      toast.success(data.message);
      fetchPin(id);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function addPin(
    formData,
    setFilePrev,
    setFile,
    setTitle,
    setPin,
    navigate
  ) {
    try {
      const { data } = await axios.post(process.env.REACT_APP_API_URL + "/newPin", formData);

      toast.success(data.message);
      setFile([]);
      setFilePrev("");
      setPin("");
      setTitle("");
      fetchPins();
      navigate("/");

    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    fetchPins();
  }, []);

  return (
    <PinContext.Provider
      value={{
        pins,
        loading,
        fetchPin,
        pin,
        addComment,
        deleteComment,
        addPin,
        fetchPins,
        
      }}
    >
      {children}
    </PinContext.Provider>
  );
};

export const PinData = () => useContext(PinContext);


