import React, { useState, useEffect } from "react";
import "./Home.css";
import { AiOutlineSearch } from "react-icons/ai";
import { BiHomeAlt } from "react-icons/bi";
import { BiMap } from "react-icons/bi";
import { BiMenu } from "react-icons/bi";
import { BiBell } from "react-icons/bi";
import { BiUserCircle } from "react-icons/bi";

import axios from "axios";
// import { BiDotsHorizontalRounded } from "react-icons/bi";

import { BiGroup } from "react-icons/bi";

import { CgProfile } from "react-icons/cg";
import { CgLogOut } from "react-icons/cg";
import { logout } from "../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { CreatePost } from "../actions/post";

export default function Header() {
  const [address, setaddress] = useState("");
  const [descripstion, setdescripstion] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [profile, setprofile] = useState(false);
  const [enterPopup, setEnterPopup] = useState(false);
  const [enteredSearch, setEnteredSearch] = useState(false);
  const [addpost, setaddpost] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { Post } = useSelector((state) => state.post);
  console.log("currentUse",currentUser )
  console.log("post", +Post);

  const handleAdmin = () => {
   
    if (currentUser.data.role === "admin") {
      window.location.replace("/admin");
    } else {
      
      alert("Bạn Không Có Quyền Vào Trang này");
    }
  };

  const onHandleProfile = (e) => {
    setprofile(!profile);
    if (profile) {
      window.location.replace("/profile");
    }
  };

  const onHanler = () => {
    setEnterPopup(!enterPopup);
  };
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout())
      .then(() => {
        window.location.replace("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const Handlehome = (e) => {
    e.preventDefault();
    window.location.replace("/home");
  };
  if (!isLoggedIn) {
    window.location.replace("/login");
  }
  if (enteredSearch) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  const HandleChangeMap = (e) => {
    e.preventDefault();
    window.location.replace("/map");
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/Project/getpost")
      .then((response) => {
        return response.data;
      })
      .then((result) => {
        const postlist = [...result.data];
        setaddpost(postlist);
        console.log(postlist);
      });
  }, []);

  const onDelete = (id) => {
    const newPosts = addpost.filter((item) => item.id !== id);
    setaddpost(newPosts);
  };

  return (
    <div>
      <div className="nav">
        <div className="nav-left">
          <a href="#">
            <AiOutlineSearch className="nav-left_searchIcon"></AiOutlineSearch>
          </a>
          <input type="text" className="inputSeacrh" />
        </div>
        <div className="nav-align">
          <ul className="nav-align_menu">
            <li className="nav-align_item">
              <a href="#">
                <BiHomeAlt
                  className="nav-align_icon"
                  onClick={Handlehome}
                ></BiHomeAlt>
              </a>
            </li>
            <li className="nav-align_item">
              <a href="#">
                <BiMap
                  className="nav-align_icon"
                  onClick={HandleChangeMap}
                ></BiMap>
              </a>
            </li>
            <li className="nav-align_item">
              <a href="#">
                <BiGroup className="nav-align_icon"></BiGroup>
              </a>
            </li>
          </ul>
        </div>
        <div className="nav-right">
          <ul className="nav-right_menu">
            <li className="nav-align_item">
              <a href="#">
                <BiMenu className="nav-align_icon"></BiMenu>
              </a>
            </li>
            <li className="nav-align_item">
              <a href="#">
                <BiBell className="nav-align_icon"></BiBell>
              </a>
            </li>
            <li className="nav-align_item  nav-align_item-user">
              <a href="#">
                <BiUserCircle className="nav-align_icon" onClick={onHanler}>
                  {/* {enterPopup && ( */}

                  {/* )} */}
                </BiUserCircle>
              </a>
              {enterPopup && (
                <div className="user__modal--body">
                  <ul className="user__modal--body-list">
                    <li className="user__modal--body-item">
                      <p onClick={handleAdmin}>Admin</p>
                      <BiGroup className="user__modal--body-icon"></BiGroup>
                    </li>
                    <li
                      className="user__modal--body-item"
                      onClick={onHandleProfile}
                    >
                      <p>Profile</p>
                      <CgProfile className="user__modal--body-icon"></CgProfile>
                    </li>
                    <li className="user__modal--body-item">
                      <p onClick={handleLogout}>LogOut</p>
                      <CgLogOut className="user__modal--body-icon"></CgLogOut>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
