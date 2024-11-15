
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserData } from "./context/userContext";
import { Loading } from "./components/loading";
import Navbar from './components/navbar';

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
                <Route path="/login" element={
                  isAuth ? <Home /> :
                 <Login />} />
                <Route path="/register" element={
                  isAuth ? <Home /> : 
                <Register />}/>
              </Routes>
            </BrowserRouter>


        )}
    </>

  );
}

export default App;
