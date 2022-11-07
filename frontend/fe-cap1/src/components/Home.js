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


import React, { useState } from "react";
import "./Home.css";
import { AiOutlineSearch } from "react-icons/ai";
import { BiHomeAlt } from "react-icons/bi";
import { BiMap } from "react-icons/bi";
import { BiMenu } from "react-icons/bi";
import { BiBell } from "react-icons/bi";
import { BiUserCircle } from "react-icons/bi";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FcClock } from "react-icons/fc";
import { FcVideoCall } from "react-icons/fc";
import { FcPicture } from "react-icons/fc";
import { SlEmotsmile } from "react-icons/sl";
import { BiWorld } from "react-icons/bi";
import { BiGroup } from "react-icons/bi";
import { AiTwotoneLike } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import { AiOutlineShareAlt } from "react-icons/ai";


const Home = () => {
  const [enteredSearch, setEnteredSearch] = useState("");
  const titleChangeHandler = (event) => {
    setEnteredSearch(event.target.value);
    setEnteredSearch({
      ...enteredSearch,
      enteredSearch: event.target.value,
    });
    setEnteredSearch((prevState) => {
      return { ...prevState, enteredSearch: event.target.value };
    });
  };

  return (
    <div>
      <div className="nav">
        <div className="nav-left">
          <a href="#" >
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
                    <BiMap className="nav-align_icon"></BiMap>
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
              <li className="nav-align_item">
                  <a href="#">
                    <BiUserCircle className="nav-align_icon"></BiUserCircle>
                  </a>
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
              <div className="home-body_post-input">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiquxzRvxiQGtrn3rlBgGKAWixXBIhPWhOOw&usqp=CAU" alt="" class=""/>
                <input placeholder="Ngân ơi, bạn cần hỗ trợ gì?" type="text" className="inputPost" />
              </div>
              <ul className="post-choose">
                <li className="post-choose_item">
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
            <div className="home-body_news">
              <div className="new-header">
              <img class="new-header_img" className="new-header_img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiquxzRvxiQGtrn3rlBgGKAWixXBIhPWhOOw&usqp=CAU" alt="" />
                <div className="new-header_infor">
                  <p className="new-header_infor-name">Lê Thị Kim Ngân</p>
                    <div className="new-header_infor-time">
                          <span>1 giờ</span>
                          <BiWorld className="new-header_infor-earth"></BiWorld>
                    </div>
                </div>
                <BiDotsHorizontalRounded className="new-header_infor-icon"> </BiDotsHorizontalRounded>
              </div>
              <div className="new-content">
                <p>1234567890</p>
                <img className="new-content_img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiquxzRvxiQGtrn3rlBgGKAWixXBIhPWhOOw&usqp=CAU" alt="" />
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
        </div>
      </div>
    </div>
  );
};
export default Home;