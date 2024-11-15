import {
  createContext, useContext,
  useEffect, 
  useState
} from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);


  async function registerUser(name, email, password, navigate, 
    // fetchPins
  ) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(process.env.REACT_APP_API_URL +"/register", {
        name,
        email,
        password,
      },{ withCredentials: true });

      toast.success(data.message);
      setUser(data.user);
      setIsAuth(true);
      setBtnLoading(false);
      navigate("/");
      // fetchPins();
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  }

  async function loginUser(email, password, navigate,
    // fetchPins
  ) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(process.env.REACT_APP_API_URL + "/login", { email, password },{ withCredentials: true });

      toast.success(data.message);
      setUser(data.user);
      setIsAuth(true);
      setBtnLoading(false);
      navigate("/");
      //   fetchPins();
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  }

  const [loading, setLoading] = useState(true);

  async function fetchUser() {
    try {
      const { data } = await axios.get(process.env.REACT_APP_API_URL +"/me",{ withCredentials: true });

      setUser(data);
      setIsAuth(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        loginUser,
        btnLoading,
        isAuth,
        user,
        loading,
        registerUser,
        setIsAuth,
        setUser,
        // followUser,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );

}

export const UserData = () => useContext(UserContext);