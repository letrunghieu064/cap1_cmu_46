import React, { useState, useEffect, useRef } from "react";

import { CiTrash } from "react-icons/ci";
import { CiPickerEmpty } from "react-icons/ci";
import { AiTwotoneLike } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import { AiOutlineShareAlt } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import {  useSelector } from "react-redux";
import userService from "../services/user.service";

export default function PostItem({ post, onDelete }) {
 // const { posts } = useSelector((state) => state.post);
  const [chosePost, setChosepost] = useState(false);
  const [comment, setComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [like, setLike] = useState(false);
  // const refInputComment = useRef(null);
  const [writerComment, setWriterComment] = useState("");


  const handleComment = (e) => {
    setComment(!comment);
  };
  const handleChose = (e) => {
    e.preventDefault();
    console.log("Sssss");
    setChosepost(!chosePost);
  };
  const hanldeLike = (e) => {
    setLike(!like);
    if (like) {
     const res = userService.createLike(like);
    } else {
    }
  };
  const handleWriterComment = async (e) => {
    e.preventDefault();
    if (writerComment === "") {
      alert("bạn chưa bình luận");
    } else {
      const res = await userService.createComment(post.id, writerComment);

      console.log("rex", res);

      setComments([{ ...res }, ...comments]);
    }
    // refInputComment.current.value = "";
  };
  useEffect(() => {
    const res = userService
      .getComments(post.id)
      .then((comment) => {
        setComments(comment);
        return comment;
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
  const onDeleteComment = (id) => {
    const newComments = comments.filter((item) => item.id !== id);
    console.log("new", newComments);
    setComments(newComments);
  };
  const handleDeleteComment = async (id) => {
    const response = await userService.deleteComment(id);

    console.log("response", response);
    if (response !== 200) {
      alert(" xoá không thành công , bạn không thể xóa bình luận của người khác");
    }
    if (response === 200) {
      onDeleteComment(id);
    }
  };
  const handleEditComment = async (id) => {};

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
          <p className="new-header_infor-name">{post.name}</p>
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
              // ref={refInputComment}
              value={writerComment}
              onChange={(e) => {
                setWriterComment(e.target.value);
              }}
            ></input>
            <button
              class="btn btn-primary"
              type="submit"
              onClick={handleWriterComment}
            >
              Bình
            </button>
          </div>
          {comments.map((com) => (
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
                    {com.description}
                  </span>
                </div>
                <p className="comment_others-action">Thích</p>
                <p
                  className="comment_others-action"
                  onClick={() => {
                    handleDeleteComment(com.id);
                  }}
                >
                  xoá
                </p>
                <p
                  className="comment_others-action"
                  onClick={() => {
                    handleEditComment(com.id);
                  }}
                >
                  chỉnh sửa
                </p>
                <span className="comment_others-action">
                  {com.created_at.toString().slice(0, 10)}
                </span>
              </div>
            </div>
          ))}
          <div className="comment_view-morer">
            <p>Xem thêm bình luận</p>
          </div>
        </div>
      )}

      {/* comment */}
    </div>
  );
}
