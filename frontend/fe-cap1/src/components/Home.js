// // import React, { useState, useEffect } from "react";

// // import UserService from "../services/user.service";

// // const Home = () => {
// //   const [content, setContent] = useState("");

// //   useEffect(() => {
// //     UserService.getPublicContent().then(
// //       (response) => {
// //         setContent(response.data);
// //       },
// //       (error) => {
// //         const _content =
// //           (error.response && error.response.data) ||
// //           error.message ||
// //           error.toString();

// //         setContent(_content);
// //       }
// //     );
// //   }, []);

// //   return (
// //     <div className="container">
// //       <header className="jumbotron">
// //         <h3>{content}</h3>
// //       </header>
// //     </div>
// //   );
// // };

// // export default Home;


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
import { TfiClose } from "react-icons/tfi";
import { CiLocationOn } from "react-icons/ci";

import { CgProfile } from "react-icons/cg";
import { CgLogOut } from "react-icons/cg";

// 2 import cần coppy
import { CiTrash } from "react-icons/ci";
import { CiPickerEmpty } from "react-icons/ci";
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
      let post = document.getElementById("post-choose_item")
      let create_modal = document.querySelector('.create_modal')
      function showPost(){
            create_modal.classList.add('open')
      }
    post.addEventListener('click',showPost)

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
              <li  className="nav-align_item">
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
                    <BiUserCircle className="nav-align_icon"></BiUserCircle>
                  </a>
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
                    <p>Đăng xuất</p>
                    <CgLogOut className="user__modal--body-icon"></CgLogOut>
                    </li>
                  </ul>      
              </div>
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
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiquxzRvxiQGtrn3rlBgGKAWixXBIhPWhOOw&usqp=CAU" alt="" class=""/>
                <input id="inputPost" placeholder="Ngân ơi, bạn cần hỗ trợ gì?" type="text" className="inputPost" />
              </div>
              <ul className="post-choose">
                <li id="post-choose_item" className="post-choose_item">
                  <FcVideoCall  className="post-choose_icon"></FcVideoCall>
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
                {/* đầu: Dòng cần coppy */}
                <div className="new-header_infor-icons"><BiDotsHorizontalRounded className="new-header_infor-icon">
                </BiDotsHorizontalRounded>
                <div className="more_action-post">
                    <ul className="post_action-list">
                      <li className="post_action-item">
                      <p>Xóa</p>
                        <CiTrash className="post_action-icon"></CiTrash>
                      </li>
                      <li className="post_action-item">
                      <p>Chỉnh Sửa</p>
                        <CiPickerEmpty className="post_action-icon"></CiPickerEmpty>
                        </li>
                    </ul>
                </div>
                </div>  
                    {/* cuối       */}
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
                {/* coppy khối comment */}
                <div className="comment">
                  <div className="comment_user">
                  <img className="comment_user_avatar" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiquxzRvxiQGtrn3rlBgGKAWixXBIhPWhOOw&usqp=CAU" alt="" />
                    <input className="comment_user-input" placeholder="Viết bình luận"></input>
                  </div>
                  <div className="comment_others">
                  <img className="comment_others_avatar" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQztTqQRZ0RaSy0nVuhnzhEx3Rz9N88L8eWJg&usqp=CAU" alt="" />
                    <div className="comment_others-infor">
                        <div className="comment_others-infor-cmt">
                        <p className="comment_others-name">Luận</p>
                        <span className="comment_others-content">alo12345643223243543543522222222222222222222alo12345643223243543543522222222222222222222
                        </span>
                        </div>
                        <p className="comment_others-action">Thích</p>
                    </div>
                  </div>
                  <div className="comment_others">
                  <img className="comment_others_avatar" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQztTqQRZ0RaSy0nVuhnzhEx3Rz9N88L8eWJg&usqp=CAU" alt="" />
                    <div className="comment_others-infor">
                        <div className="comment_others-infor-cmt">
                        <p className="comment_others-name">Hiếu
                      </p>
                        <span className="comment_others-content">alo12345643223243543543522222222222222222222alo12345643223243543543522222222222222222222
                        </span>
                        </div>
                        <p className="comment_others-action">Thích</p>
                    </div>
                  </div>
                  <div className="comment_view-morer">
                    <p>Xem thêm bình luận</p>
                  </div>
                </div>
            </div>
        </div>
      </div>
      <div id="create_modal" className="create_modal">
      <div className="modal-overplay"></div>
      <div className="modal--body">
        <div className="create--header">
            <p className="create--title">Tạo bài viết</p>
            <TfiClose className="create--close"></TfiClose>
        </div>
        <div className="create--header__user">
        <img class="header__user-img" className="new-header_img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiquxzRvxiQGtrn3rlBgGKAWixXBIhPWhOOw&usqp=CAU" alt="" />
        <p>Lê Thị Kim Ngân</p>
        </div>
        <div className="create--header-content">
        <textarea className="header-content-textarae" id="w3review" name="w3review" ></textarea>
        </div>
        <div className="create__content"> 
        <input placeholder="Nhập địa chỉ"  type="text" className="create__content-input" />
        </div>
        <div className="create__choose">
          <p>Thêm vào bài viết </p>
          <CiLocationOn className="create__choose-location"></CiLocationOn>
        </div>
        <div className="create__submit">
            <button className="create__submit-submit">Đăng</button>
        </div>
      </div>
      </div>
      

            
    </div>
    
  );
  
};
export default Home;
