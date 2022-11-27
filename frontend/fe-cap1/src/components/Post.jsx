import React from "react";

import { BiWorld } from "react-icons/bi";
import "./Home.css";
import { AiTwotoneLike } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import { AiOutlineShareAlt } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { BiDotsHorizontalRounded } from "react-icons/bi";
export default function Post() {
  const { post } = useSelector((state) => state.post);
  console.log("post", post);
  return (
    <div>
      <div className="home-body_news">
        <div className="new-header">
          <img
            class="new-header_img"
            className="new-header_img"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiquxzRvxiQGtrn3rlBgGKAWixXBIhPWhOOw&usqp=CAU"
            alt=""
          />
          <div className="new-header_infor">
            <p className="new-header_infor-name">Lê Thị Kim Ngân</p>
            <div className="new-header_infor-time">
              <span>1 giờ</span>
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
    </div>
  );
}
