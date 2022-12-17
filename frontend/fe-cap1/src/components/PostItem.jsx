import React, { useState, useEffect, useRef, Fragment } from "react";
import { useSelector } from "react-redux";
import { CiTrash } from "react-icons/ci";
import { CiPickerEmpty } from "react-icons/ci";
import { AiTwotoneLike } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import { AiOutlineShareAlt } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import Comment from "./comment/Comment";
import userService from "../services/user.service";
import EditPost from "./editpost/EditPost";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function PostItem({ post, onDelete }) {
  // const { posts } = useSelector((state) => state.post);
  const [chosePost, setChosepost] = useState(false);
  const [comment, setComment] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [like, setLike] = useState(0);
  const [postItem, setPostItems] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [checklike, setCheckLike] = useState(false);
  const [likes, setLikes] = useState([]);
  const [postitem,setPostItem]=useState()
  const handleCreateModal = (e) => {
    setPostItems(post);
    console.log("hasggs", postItem);
    setCreateModal(!createModal);
  };
  // const posts=[...post]
  // console.log("post,",posts)

  const handleComment = (e) => {
    setComment(!comment);
  };
  const handleChose = (e) => {
    e.preventDefault();

    setChosepost(!chosePost);
  };
  const sumArray =  () => {
    setPostItem(post)
    let sum = 0;
    console.log("likes1", postitem);
  //  const  newArr = likes.filter( (item) =>{
   
  //     return newArr.includes(item.user_id) ? '' : newArr.push(item)
  //   })
    
    // console.log("likes2", newArr);
    likes.map((value) =>{
      if(value.post_id ==  postitem?.id)
        sum += 1;
        
    });
   
    return sum;
  };
  const hanldeLike = async (post_id) => {
    setCheckLike(!checklike);
    if (checklike) {
     
      const res = await userService.createLike(currentUser?.data?.id, post_id);
      setLike(sumArray);
      console.log("like", res);
    } else {
      if (like > 0) {
        setLike(sumArray);
      } else {
        setLike(sumArray);
      }
    }
  };

  const handleDeletePost = async (id) => {
    const response = await userService.deletePost(id);
    console.log("res", response);
    if (response !== 200) {
      toast.error('Post is not of you!', {
        position: toast.POSITION.TOP_CENTER
    });
    }
    if (response === 200) {
      onDelete(id);
    }

    //call api
    // if false ->  alert loi
    // if true
    // onDelete(id);
  };
  useEffect(() => {
    setLike(sumArray);
   const   frechData = async () => {
      const res = await userService
        .getLikes()
        .then((likes) => {
          return likes;
        })
        .then((likes) => {
          setLikes(likes)
          return likes;
         
        })
        .catch((error) => {
          console.error(error);
        });
     return res;
     
    };
   
    frechData();
   
  }, []);

  // }
  // if (checklike) {
  // console.log("like",currentUser?.data?.id,post_id)
  //  const res = userService.createLike(currentUser?.data?.id,post_id);
  // } else {
  // }

  if (!post) return <Fragment />;

  return (
    <div className="home-body_news">
      <div className="new-header">
        <img
          class="new-header_img"
          className="new-header_img"
          src={
            post?.user?.url_img ||
            "https://jp.boxhoidap.com/boxfiles/cach-de-anh-dai-dien-dep--f85ddf18094383e085fb97258c9c8d87.wepb"
          }
          // alt={post.name}
        />
        <div className="new-header_infor">
          <p className="new-header_infor-name">{post?.user?.username}</p>
          <div className="new-header_infor-time">
            <span>{post?.created_at?.toString().slice(0, 10)}</span>
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
                  <p onClick={handleCreateModal}>Chỉnh Sửa </p>
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
        <p>{post?.description}</p>
        <img
          style={{ width: "450px", height: "400" }}
          className="new-content_img"
          src={post?.img_url}
          alt={post?.img_url}
        />
      </div>
      <div className="new-actions">
        <div className="new-action">
          <AiTwotoneLike className="new-actions-icon"></AiTwotoneLike>
          <p className="new-actions-text" onClick={hanldeLike}>
            {like} Thích
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
      {comment && <Comment postId={post.id} />}
      {/* comment */}
      {createModal && (
        <EditPost onClose={handleCreateModal} postItem={postItem}></EditPost>
      )}
    </div>
  );
}
