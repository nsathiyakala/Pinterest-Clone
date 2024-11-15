
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserData } from "./context/userContext";
import { Loading } from "./components/loading";
import Navbar from './components/navbar';
import PinPage from './pages/Pinpage';
import Create from './pages/create';
import Account from './pages/Account';
import UserProfile from './pages/UserProfile';

function App() {
  const { loading, isAuth, user } = UserData();
  return (
    <>
      {
        loading ? (
          <Loading />
        ) : (

          <BrowserRouter>
            {isAuth && <Navbar user={user} />}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/user/:id" element={isAuth ? <UserProfile user={user} /> : <Login />}/>
              <Route path="/account"  element={isAuth ? <Account user={user} /> : <Login />}/>
              <Route path="/create" element={isAuth ? <Create /> : <Login />} />
              <Route path="/pin/:id" element={isAuth ? <PinPage user={user} /> : <Login />}
            />
              <Route path="/login" element={isAuth ? <Home /> :  <Login />} />
              <Route path="/register" element={ isAuth ? <Home /> :   <Register />} />
            </Routes>
          </BrowserRouter>


        )}
    </>

  );
}

export default App;
