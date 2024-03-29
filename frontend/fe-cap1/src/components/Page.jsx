import React, { useState, useEffect, useCallback ,Fragment} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Link, useLocation, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Profile from "./Profile";
import { logout } from "../actions/auth";
import { clearMessage } from "../actions/message";
import Admin from "./Admin";
import Map from "./Map";
// import HomeAll from "./HomeAll";
import Forgotpassword from "./forgotpassword/Forgotpassword";
import Profile1 from "./Profile1";
import Person from "./person/Person";
import HomePage from "./homepage/HomePage";
export default function Page() {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { isLoggedIn, currentUser } = useSelector((state) => state.auth);
  console.log("isLoggedIn", isLoggedIn);
  const dispatch = useDispatch();

  let location = useLocation();
  //console.log("location ", location);

  useEffect(() => {
    if (["/login", "/register"].includes(location?.pathname)) {
      dispatch(clearMessage()); // clear message when changing location
    }
  }, [dispatch, location]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    } else {
      setShowModeratorBoard(false);
      setShowAdminBoard(false);
    }
  }, [currentUser]);
  return (
    <div className="App">

      {/* {!isLoggedIn && (

        <nav className="navbar navbar-expand navbar-dark bg-success">
          <Link to={"/"} className="navbar-brand">

          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (

            // <div className="navbar-nav ml-auto">
            //   <li className="nav-item">
            //     <Link to={"/login"} className="nav-link">
            //       Login
            //     </Link>
            //   </li>
            <div className="navbar-nav ml-auto">
               <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                Sign Up
                </Link>
             </li>
           </div>
            
          )}
        </nav>
      )} */}

      {/* <div className="container mt-3"> */}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile1 />} />
        <Route path="/person" element={<Person/>} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/homepage" element={<HomePage />} />
        {/* <Route path="/homepage" element={<HomePage />} /> */}

        {/* <Route path="/user" element={<BoardUser />} />
              <Route path="/mod" element={<BoardModerator />} />
              <Route path="/admin" element={<BoardAdmin />} /> */}
      </Routes>
    </div>
    // </div>
  );
}
