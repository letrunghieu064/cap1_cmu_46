import React, { useState, useEffect, useRef, Fragment } from "react";

import { CiTrash } from "react-icons/ci";
import { CiPickerEmpty } from "react-icons/ci";
import { AiTwotoneLike } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import { AiOutlineShareAlt } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import Comment from "./comment/Comment";
import userService from "../services/user.service";

export default function PostItem({ post, onDelete }) {
 // const { posts } = useSelector((state) => state.post);
  const [chosePost, setChosepost] = useState(false);
  const [comment, setComment] = useState(false);
  
  const [like, setLike] = useState(false);
  // const refInputComment = useRef(null);
  


  const handleComment = (e) => {
    setComment(!comment);
  };
  const handleChose = (e) => {
    e.preventDefault();
  
    setChosepost(!chosePost);
  };
  const hanldeLike = (e) => {
    setLike(!like);
    if (like) {
     const res = userService.createLike(like);
    } else {
    }
  };
  

  const handleDeletePost = async (id) => {
    const response = await userService.deletePost(id);
    console.log("res", response);
    if (response !== 200) {
      alert(" xoá không thành công ");
    }
    if (response === 200) {
      onDelete(id);
    }

    //call api
    // if false ->  alert loi
    // if true
    // onDelete(id);
  };

  
  if(!post) return <Fragment/>

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
          <p className="new-header_infor-name">{post?.user?.username}</p>
          <div className="new-header_infor-time">
            <span>{post.created_at.toString().slice(0, 10)}</span>
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
                <li
                  className="post_action-item"
                  onClick={() => handleDeletePost(post.id)}
                >
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
        <p>{post.description}</p>
        <img
          style={{ width: "450px", height: "400" }}
          className="new-content_img"
          src={post.img_url}
          alt={post.img_url}
        />
      </div>
      <div className="new-actions">
        <div className="new-action">
          <AiTwotoneLike className="new-actions-icon"></AiTwotoneLike>
          <p className="new-actions-text" onClick={hanldeLike}>
            Thích
          </p>
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
      {comment && 
      <Comment postId={post.id} /> }
      {/* comment */}
    </div>
  );
}
