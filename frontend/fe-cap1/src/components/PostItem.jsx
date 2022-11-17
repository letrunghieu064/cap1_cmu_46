import React, { useState } from "react";

import { CiTrash } from "react-icons/ci";
import { CiPickerEmpty } from "react-icons/ci";
import { AiTwotoneLike } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import { AiOutlineShareAlt } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import userService from "../services/user.service";

export default function PostItem({ post, onDelete }) {
  const { posts } = useSelector((state) => state.post);
  console.log("posts", posts);
  const [chosePost, setChosepost] = useState(false);
  const [comment, setComment] = useState(false);
  const [comments, setcomments] = useState([]);
  const [writerComment, setWriterComment] = useState("");
  const handleComment = (e) => {
    setComment(!comment);
  };
  const handleChose = (e) => {
    e.preventDefault();
    console.log("Sssss");
    setChosepost(!chosePost);
  };
  const handleWriterComment = (e) => {
    e.preventDefault();
    userService.createComment();
  };

  const handleDelete = (id) => {
    console.log("de;e", id);
    //call api
    // if false ->  alert loi
    //if true
    // onDelete(id);
  };

  return (
    <div className="home-body_news">
      <div className="new-header">
        <img
          class="new-header_img"
          className="new-header_img"
          src={post.img_url}
          alt={post.name}
        />
        <div className="new-header_infor">
          <p className="new-header_infor-name">{post.descripstion}</p>
          <div className="new-header_infor-time">
            <span>{post.createdAt}</span>
            <BiWorld className="new-header_infor-earth"></BiWorld>
          </div>
        </div>
        <div className="new-header_infor-icons">
          <BiDotsHorizontalRounded
            className="new-header_infor-icon"
            onClick={handleChose}
          ></BiDotsHorizontalRounded>
          {chosePost && (
            <div className="more_action-post">
              <ul className="post_action-list">
                <li className="post_action-item" onClick={handleDelete("x")}>
                  <p>Xóa</p>
                  <CiTrash className="post_action-icon"></CiTrash>
                </li>
                <li className="post_action-item">
                  <p>Chỉnh Sửa</p>
                  <CiPickerEmpty className="post_action-icon"></CiPickerEmpty>
                </li>
              </ul>
            </div>
          )}
        </div>
        {/* <BiDotsHorizontalRounded className="new-header_infor-icon">
        {" "}
      </BiDotsHorizontalRounded> */}
      </div>
      <div className="new-content">
        <p>{post.id}</p>
        <img
          style={{ width: "450px", height: "400" }}
          className="new-content_img"
          src={post.img_url}
          alt={post.name}
        />
      </div>
      <div className="new-actions">
        <div className="new-action">
          <AiTwotoneLike className="new-actions-icon"></AiTwotoneLike>
          <p className="new-actions-text">Thích</p>
        </div>
        <div className="new-action" onClick={handleComment}>
          <AiOutlineComment className="new-actions-icon"></AiOutlineComment>
          <p className="new-actions-text">Bình luận</p>
        </div>
        <div className="new-action">
          <AiOutlineShareAlt className="new-actions-icon"></AiOutlineShareAlt>
          <p className="new-actions-text">Chia sẻ</p>
        </div>
      </div>
      {/* comment */}
      {comment && (
        <div className="comment">
          <div className="comment_user">
            <img
              className="comment_user_avatar"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiquxzRvxiQGtrn3rlBgGKAWixXBIhPWhOOw&usqp=CAU"
              alt=""
            />
            <input
              className="comment_user-input"
              placeholder="Viết bình luận"
              value={writerComment}
              onChange={(e) => {
                setWriterComment(e.target.value);
              }}
            ></input>
            <button
              class="btn btn-primary"
              type="submit"
              onClick={handleWriterComment()}
            >
              Bình
            </button>
          </div>

          <div className="comment_others">
            <img
              className="comment_others_avatar"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQztTqQRZ0RaSy0nVuhnzhEx3Rz9N88L8eWJg&usqp=CAU"
              alt=""
            />
            <div className="comment_others-infor">
              <div className="comment_others-infor-cmt">
                <p className="comment_others-name">Hiếu</p>
                <span className="comment_others-content">
                  alo12345643223243543543522222222222222222222alo12345643223243543543522222222222222222222
                </span>
              </div>
              <p className="comment_others-action">Thích</p>
            </div>
          </div>
          <div className="comment_view-morer">
            <p>Xem thêm bình luận</p>
          </div>
        </div>
      )}
      {/* comment */}
    </div>
  );
}
