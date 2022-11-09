// import React, { useState, useEffect } from "react";

// import UserService from "../services/user.service";

// const Home = () => {
//   const [content, setContent] = useState("");

//   useEffect(() => {
//     UserService.getPublicContent().then(
//       (response) => {
//         setContent(response.data);
//       },
//       (error) => {
//         const _content =
//           (error.response && error.response.data) ||
//           error.message ||
//           error.toString();

//         setContent(_content);
//       }
//     );
//   }, []);

//   return (
//     <div className="container">
//       <header className="jumbotron">
//         <h3>{content}</h3>
//       </header>
//     </div>
//   );
// };
// import React, { useState, useEffect } from "react";

// import UserService from "../services/user.service";

// const Home = () => {
//   const [content, setContent] = useState("");

//   useEffect(() => {
//     UserService.getPublicContent().then(
//       (response) => {
//         setContent(response.data);
//       },
//       (error) => {
//         const _content =
//           (error.response && error.response.data) ||
//           error.message ||
//           error.toString();

//         setContent(_content);
//       }
//     );
//   }, []);

//   return (
//     <div className="container">
//       <header className="jumbotron">
//         <h3>{content}</h3>
//       </header>
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import "./Home.css";
import { AiOutlineSearch } from "react-icons/ai";
import { BiHomeAlt } from "react-icons/bi";
import { BiMap } from "react-icons/bi";
import { BiMenu } from "react-icons/bi";
import { BiBell } from "react-icons/bi";
import { BiUserCircle, BiDotsHorizontalRounded } from "react-icons/bi";
import Posts from "../components/Post";
import axios from "axios";
// import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FcClock } from "react-icons/fc";
import { FcVideoCall } from "react-icons/fc";
import { FcPicture } from "react-icons/fc";
import { SlEmotsmile } from "react-icons/sl";
import { BiWorld } from "react-icons/bi";
import { BiGroup } from "react-icons/bi";
import { AiTwotoneLike } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import { AiOutlineShareAlt } from "react-icons/ai";
import { TfiClose } from "react-icons/tfi";
import { CiLocationOn } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { CgLogOut } from "react-icons/cg";
import { logout } from "../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { CreatePost } from "../actions/post";
const Home = () => {
  const [address, setaddress] = useState("");
  const [descripstion, setdescripstion] = useState("");
  const [img_url, setimgurl] = useState("");

  const [enterPopup, setEnterPopup] = useState(false);
  const [enteredSearch, setEnteredSearch] = useState(false);
  const [addpost, setaddpost] = useState([]);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { Post } = useSelector((state) => state.post);

  console.log("post", +Post);
  const titleChangeHandler = () => {
    setEnteredSearch(!enteredSearch);
    console.log("titleChangeHandler" + enteredSearch);
    // let create_modal = document.querySelector(".create_modal");
  };
  const onChangeAddress = (e) => {
    const address = e.target.value;
    setaddress(address);
    console.log(address);
  };
  const onChangeDescription = (e) => {
    const descripstion = e.target.value;
    setdescripstion(descripstion);
    console.log(descripstion);
  };
  const onChangeImg_url = (e) => {
    const img_url = e.target.value;
    setimgurl(img_url);
    console.log(img_url);
  };
  const HandleCreatePost = async () => {
    await dispatch(CreatePost(descripstion, address, img_url));
    setTimeout(function () {
      titleChangeHandler();
    }, 1000);
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
                <BiHomeAlt className="nav-align_icon"></BiHomeAlt>
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
                      <p>Admin</p>
                      <BiGroup className="user__modal--body-icon"></BiGroup>
                    </li>
                    <li className="user__modal--body-item">
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
      <div className="home-body">
        <div className="home-body_left">
          <ul className="body_left-list">
            <li className="body_left-item">
              <a href="#" className="body_left-item_link">
                <BiUserCircle className="body_left-item-icon"> </BiUserCircle>
                <p>Lê Thị Kim Ngân</p>
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
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiquxzRvxiQGtrn3rlBgGKAWixXBIhPWhOOw&usqp=CAU"
                alt=""
                class=""
              />
              <input
                id="inputPost"
                placeholder="Ngân ơi, bạn cần hỗ trợ gì?"
                type="text"
                className="inputPost"
                onClick={titleChangeHandler}
              />
            </div>
            <ul className="post-choose">
              <li id="post-choose_item" className="post-choose_item">
                <FcVideoCall className="post-choose_icon"></FcVideoCall>
                <p>Video Trực Tiếp</p>
              </li>
              <li className="post-choose_item">
                <FcPicture className="post-choose_icon"></FcPicture>
                <p>Ảnh/Video</p>
              </li>
              <li className="post-choose_item">
                <SlEmotsmile className="post-choose_icon post-choose_icon-smile"></SlEmotsmile>
                <p>Cảm xúc/Hoạt động</p>
              </li>
            </ul>
          </div>

          {addpost.map((post) => (
            <div className="home-body_news">
              <div className="new-header">
                <img
                  class="new-header_img"
                  className="new-header_img"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiquxzRvxiQGtrn3rlBgGKAWixXBIhPWhOOw&usqp=CAU"
                  alt=""
                />
                <div className="new-header_infor">
                  <p className="new-header_infor-name">{post.descripstion}</p>
                  <div className="new-header_infor-time">
                    <span>{post.createdAt}</span>
                    <BiWorld className="new-header_infor-earth"></BiWorld>
                  </div>
                </div>
                <BiDotsHorizontalRounded className="new-header_infor-icon">
                  {" "}
                </BiDotsHorizontalRounded>
              </div>
              <div className="new-content">
                <p>1234567890</p>
                <img
                  className="new-content_img"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiquxzRvxiQGtrn3rlBgGKAWixXBIhPWhOOw&usqp=CAU"
                  alt=""
                />
              </div>
              <div className="new-actions">
                <div className="new-action">
                  <AiTwotoneLike className="new-actions-icon"></AiTwotoneLike>
                  <p className="new-actions-text">Thích</p>
                </div>
                <div className="new-action">
                  <AiOutlineComment className="new-actions-icon"></AiOutlineComment>
                  <p className="new-actions-text">Bình luận</p>
                </div>
                <div className="new-action">
                  <AiOutlineShareAlt className="new-actions-icon"></AiOutlineShareAlt>
                  <p className="new-actions-text">Chia sẻ</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {enteredSearch && (
        <div id="create_modal" className="open create_modal">
          <div onClick={titleChangeHandler} className="modal-overplay"></div>
          <div className="modal--body">
            <div className="create--header">
              <p className="create--title">Tạo bài viết</p>
              <TfiClose
                className="create--close"
                onClick={titleChangeHandler}
              ></TfiClose>
            </div>
            <div className="create--header__user">
              <img
                class="header__user-img"
                className="new-header_img"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiquxzRvxiQGtrn3rlBgGKAWixXBIhPWhOOw&usqp=CAU"
                alt=""
              />
              <p>Lê Thị Kim Ngân</p>
            </div>
            <div className="create--header-content">
              <textarea
                className="header-content-textarae"
                id="w3review"
                name="w3review"
                onChange={onChangeDescription}
              ></textarea>
            </div>
            <div className="create__content">
              <input
                placeholder="Nhập địa chỉ"
                type="text"
                className="create__content-input"
                onChange={onChangeAddress}
              />
            </div>
            <div className="create__choose">
              <p>Thêm vào bài viết </p>
              <CiLocationOn className="create__choose-location"></CiLocationOn>
            </div>
            <div className="create__submit">
              <button
                className="create__submit-submit"
                onClick={HandleCreatePost}
              >
                Đăng
              </button>
            </div>
          </div>
        </div>
      )}
      {/* {enterPopup && (
        <div id="create_modal" className="open create_modal">
          <div onClick={onHanler} className="modal-overplay"></div>
          <div className="modal--body">
            <p>admin</p>
            <div>
              <p onClick={handleLoout}>đang xuat</p>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};
export default Home;
