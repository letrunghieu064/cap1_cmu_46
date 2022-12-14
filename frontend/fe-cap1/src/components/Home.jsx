import React, { useState, useEffect } from "react";
import "./Home.css";
import { AiOutlineSearch } from "react-icons/ai";
import { BiHomeAlt } from "react-icons/bi";
import { BiMap } from "react-icons/bi";
import { BiMenu } from "react-icons/bi";
import { BiBell } from "react-icons/bi";
import { BiUserCircle } from "react-icons/bi";
import authHeader from "../services/auth-header";
import axios from "axios";
// import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FcClock } from "react-icons/fc";
import { FcVideoCall } from "react-icons/fc";
import { FcPicture } from "react-icons/fc";
import { SlEmotsmile } from "react-icons/sl";
import { BiGroup } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { CgLogOut } from "react-icons/cg";
import { logout } from "../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import PostItem from "./PostItem";
import PostCreate from "./posts/PostCreate";
const Home = () => {
  const [enterPopup, setEnterPopup] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [addpost, setaddpost] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleCreateModal = () => {
    setCreateModal(!createModal);
  };
  const handleAdmin = () => {
    if (currentUser.data.role === "admin") {
      window.location.replace("/admin");
    } else {
      alert("Bạn Không Có Quyền Vào Trang này");
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
  if (createModal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  const HandleChangeMap = (e) => {
    e.preventDefault();
    window.location.replace("/map");
  };

  const callbackCreateSuccess = (post) => {
    setaddpost([{ ...post }, ...addpost]);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/posts",{ headers: authHeader() })
      .then((response) => {
        return response.data;
      })
      .then((result) => {
        console.log(...result);
        const postlist = [...result];
        setaddpost(postlist);
        
      });
  }, []);

  const onDelete = (id) => {
    const newPosts = addpost.filter((item) => item.id !== id);
    setaddpost(newPosts);
  };

  return (
    <div>
      {isLoggedIn && (
        <div className="nav">
          <div className="nav-left">
            <a href="!#">
              <AiOutlineSearch className="nav-left_searchIcon"></AiOutlineSearch>
            </a>
            <input type="text" className="inputSeacrh" />
          </div>
          <div className="nav-align">
            <ul className="nav-align_menu">
              <li className="nav-align_item">
                <a href="!#">
                  <BiHomeAlt
                    className="nav-align_icon"
                    onClick={Handlehome}
                  ></BiHomeAlt>
                </a>
              </li>
              <li className="nav-align_item">
                <a href="!#">
                  <BiMap
                    className="nav-align_icon"
                    onClick={HandleChangeMap}
                  ></BiMap>
                </a>
              </li>
              <li className="nav-align_item">
                <a href="!#">
                  <BiGroup className="nav-align_icon"></BiGroup>
                </a>
              </li>
            </ul>
          </div>
          <div className="nav-right">
            <ul className="nav-right_menu">
              <li className="nav-align_item">
                <a href="!#">
                  <BiMenu className="nav-align_icon"></BiMenu>
                </a>
              </li>
              <li className="nav-align_item">
                <a href="!#">
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
                        <a href="#" onClick={handleAdmin}>
                          <p>Admin</p>
                          <BiGroup className="user__modal--body-icon"></BiGroup>
                        </a>
                      </li>
                      <li className="user__modal--body-item">
                        <a href="profile">
                          <p>Profile</p>
                          <CgProfile className="user__modal--body-icon"></CgProfile>
                        </a>
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
      )}
      <div className="home-body">
        <div className="home-body_left">
          <ul className="body_left-list">
            <li className="body_left-item">
              <a href="/person" className="body_left-item_link">
                <BiUserCircle className="body_left-item-icon"> </BiUserCircle>
                <p>{currentUser .data.username}</p>
              </a>
            </li>
            <li className="body_left-item">
              <a href="#" className="body_left-item_link">
                <FcClock className="body_left-item-icon"> </FcClock>
                <p>History</p>
              </a>
            </li>
          </ul>
        </div>

        <div className="home-body_right">
          <div className="home-body_post">
            <div id="home-body_post-input" className="home-body_post-input">
              <img
                style={{ width: "200", height: "200" }}
                src="https://jp.boxhoidap.com/boxfiles/cach-de-anh-dai-dien-dep--f85ddf18094383e085fb97258c9c8d87.wepb"
                alt=""
                class=""
              />
              <input
                id="inputPost"
                placeholder={currentUser?.data?.username +", bạn cần hỗ trợ gì?"}
                type="text"
                className="inputPost"
                onClick={handleCreateModal}
              />
            </div>
            <ul className="post-choose">
              <li id="post-choose_item" className="post-choose_item">
                <FcVideoCall className="post-choose_icon"></FcVideoCall>
                <p>Video Trực Tiếp</p>
              </li>
              <li className="post-choose_item" onClick={handleCreateModal}>
                <FcPicture className="post-choose_icon"></FcPicture>
                <p>Ảnh/Video</p>
              </li>
              <li className="post-choose_item">
                <SlEmotsmile className="post-choose_icon post-choose_icon-smile"></SlEmotsmile>
                <p>Cảm xúc/Hoạt động</p>
              </li>
            </ul>
          </div>

          {addpost.map((post, index) => (
            <PostItem
              onDelete={onDelete}
              post={post}
              key={`post-item-${index}`}
            />
          ))}
        </div>
      </div>
      {createModal && (
        <PostCreate
          onClose={handleCreateModal}
          callbackCreateSuccess={callbackCreateSuccess}
        />
      )}
    </div>
  );
};
export default Home;
