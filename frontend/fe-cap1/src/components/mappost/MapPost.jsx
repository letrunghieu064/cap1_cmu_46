import { CiLocationOn } from "react-icons/ci";
import { FaSkull } from "react-icons/fa";
import { CiShare1 } from "react-icons/ci";
import React, { useState , useEffect} from "react";
import MapPostComment from "../mappostcomment/MapPostComment"
import userService from "../../services/user.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function MapPost({post,onClose}) {
  // const onclickView = (e) => {};
  console.log("sdfds",post)
  const [postitem,setPostitem]=useState(post)
  const [comments,setComments]=useState(post.comments)
  console.log("comments",comments)
  const [createModalComment,setCreateModalComment]=useState(false)
  const [writerComment,setwriterComment]=useState("")
  const callbackComment = async (comment )=>{
    setComments([{ ...comment }, ...comments])
  }
  const handleWriterComment = async (e) => {
    e.preventDefault();
    if (writerComment.length === 0) {
     console.log("ko có commnet")
    } else {
      const res = await userService.createComment(post.id, writerComment);
      callbackComment(res);
    
    }
  };
  const onDeleteComment = (id) => {
    console.log("id", id);
    const newComments = comments.filter((item) => item.id !== id);
    console.log("new", newComments);
    setComments(newComments);
  };

  const handleDeleteComment = async (id) => {
    const response = await userService.deleteComment(id);

    console.log("response", response);
    if (response !== 200) {
      toast.warning("Warning Notification !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (response === 200) {
      onDeleteComment(id);
    }
  };
  const handleCreateShow= async  () =>{ 
    setCreateModalComment(!createModalComment)
  }
  useEffect(() => {
    setComments(post.comments);
  }, [post]);
  return (
    <div>
         <div className="modal" style={{
            display: "block",
            height: "920px",
            marginTop:"60px",
            marginRight:"499px",
            width: "420px",
            left: "auto",
            right: "0px",
            
            
          }}>
              <div className="overplay modal-content-comment">
                <div className="modal-content-comment-header">
                    <div className="modal-content-comment-header-left">
                    <CiShare1 className="modal-content-comment-header-icon"></CiShare1>
                    <p>Source</p>
                    </div>
                    <div className="modal-content-comment-header-right">
                    <CiLocationOn className="modal-content-comment-header-icon"> </CiLocationOn>
                      <p onClick={onClose}>Close POST</p>
                    </div>
                    
                </div>
                <div className="modal-content-comment-content"  style={{
             height: "300px",
            overflowY: "scroll",
            
            }}> 
                <div className="modal-content-comment-content-title"> 
                  <FaSkull className="modal-content-comment-content-title-icon"></FaSkull>
                  <p>{post?.created_at?.toString().slice(0, 10)} </p>
                  <h2> 55°35′N 46°51′E</h2>
                </div>
                <div className="modal-content-comment-content-body">
                    <p>
                    {post?.description}
                    </p>
                    <img src={post?.img_url || ""} alt="" />
                    <button onClick={handleCreateShow}>Show Comment</button>
                </div>
                {createModalComment && (
                <div className="modal-content-comment-content-comment">
                <div className="modal-content-comment-content-comment-body">
                    <div className="modal-content-comment-content-comment-write">
                      <img src="https://encrypted-tbn0.gstatic.com/imageƠs?q=tbn:ANd9GcRiGxpPkOa9f5LzIgUoOswNCmnIA_DwaufG-A&usqp=CAU" />
                      <textarea placeholder="You thinking ..." value={writerComment } onChange={(e)=>{setwriterComment(e.target.value)}}></textarea>
                      <button onClick={handleWriterComment}>Comment</button>
                    </div>
                    {comments?.map((comment,index) =>(
                    // <div className="modal-content-comment-content-comment-read">
                    // <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiGxpPkOa9f5LzIgUoOswNCmnIA_DwaufG-A&usqp=CAU" />
                    // <div className="modal-content-comment-content-comment-read-letter">
                    //   <p className="comment-content-comment-read-letter-name">{comment?.user?.username}</p>
                    //   <p className="comment-content-comment-read-letter-time">11 minutes ago</p>
                    //   <p className="comment-content-comment-read-letter-writed"> {comment?.description}</p>
                    // </div>
                    // </div>
                    <MapPostComment comment={comment} handleDeleteComment={handleDeleteComment} ></MapPostComment>
                    ))}
                    <div className="modal-content-comment-content-comment-read">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiGxpPkOa9f5LzIgUoOswNCmnIA_DwaufG-A&usqp=CAU" />
                    <div className="modal-content-comment-content-comment-read-letter">
                      <p className="comment-content-comment-read-letter-name">Hieu Lee</p>
                      <p className="comment-content-comment-read-letter-time">11 minutes ago</p>
                      <p className="comment-content-comment-read-letter-writed"> Hôm qua mới nhậu ở đây luôn, sợ quá</p>
                    </div>
                    </div>
                    <div className="modal-content-comment-content-comment-read">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiGxpPkOa9f5LzIgUoOswNCmnIA_DwaufG-A&usqp=CAU" />
                    <div className="modal-content-comment-content-comment-read-letter">
                      <p className="comment-content-comment-read-letter-name">Hieu Lee</p>
                      <p className="comment-content-comment-read-letter-time">11 minutes ago</p>
                      <p className="comment-content-comment-read-letter-writed"> Hôm qua mới nhậu ở đây luôn, sợ quá</p>
                    </div>
                    </div>
                </div>
                </div>
                )}
                </div>
              </div>
        </div>
    </div>
  );
}