import React, { useState, useEffect ,useRef} from "react";
import userService from "../../services/user.service";
import { useSelector } from "react-redux";
import "./Comment.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Comment = ({ postId,post }) => {
  const [comments, setComments] = useState([]);
  const [writerComment, setWriterComment] = useState("");
  const { user: currentUser } = useSelector((state) => state.auth);
  const [error, setError] = useState(false);
  const inputCommentRef = useRef(null);
  useEffect(() => {
    const res = userService
      .getComments(postId)
      .then((comment) => {
        console.log("comments", comment);
        setComments(comment);
        return comment;
      })
      .catch((error) => {
        console.error(error);
      });
  }, [postId]);

  const handleWriterComment = async (e) => {
    e.preventDefault();
    if (writerComment.length === 0) {
      return ;
    } else {
      const res = await userService.createComment(postId, writerComment);
      
      const newComments = [...comments];
      newComments.unshift(res);
      
     
      setComments(newComments);
      setWriterComment("")
    }
  };
  console.log("xzxx 2ss", comments);
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

  const handleEditComment = async (id) => {
    const newComments = comments.map((el) => {
      el.hasEdit = false;
      if (el.id === id) el.hasEdit = true;
      return el;
    });
    setComments(newComments);
  };
  const handlEditSuccess = (comment) => {
    const newComments = comments.map((el) => {
      el.hasEdit = false;
      if (el.id === comment.id) return comment;
      return el;
    });
    setComments(newComments);
  };
  return (
    <div  className="comment" style={{
      height: "200px",
     overflowY: "scroll",
     
     }}>
      <div className="comment_user">
        <img
          className="comment_user_avatar"
          src={
            currentUser?.data?.url_img ||
            "https://jp.boxhoidap.com/boxfiles/cach-de-anh-dai-dien-dep--f85ddf18094383e085fb97258c9c8d87.wepb"
          }
          alt=""
        />
        <input
          className="comment_user-input"
          placeholder={"Provide some information...."}
          // ref={refInputComment}
          value={writerComment}
          ref={inputCommentRef}
          onChange={(e) => {
            setWriterComment(e.target.value);
          }}
        ></input>

        <button
          class="btn-comment"
          type="submit"
          onClick={handleWriterComment}
        >
          Send
        </button>
      </div>
      {error && writerComment?.length <= 0 ? (
        <label id="errorComment">Comment can not be Empty</label>
      ) : (
        " "
      )}
       <div className="comment_view-morer">
        <p>{comments?.length} comments</p>
      </div>
      {comments.map((com, index) => (
        <CommentItem
          data={com}
          key={`comment-${postId}-${index}`}
          handleDeleteComment={handleDeleteComment}
          handleEditComment={handleEditComment}
          handlEditSuccess={handlEditSuccess}
        />
      ))}
      <div className="comment_view-morer">
        <p>see more</p>
      </div>
    </div>
  );
};

const CommentItem = ({ data, handleDeleteComment, handleEditComment ,handlEditSuccess}) => {
  const [comment, setComment] = useState(data);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleWriterComment = async (e) => {
    e.preventDefault();
    if (comment.description.length === 0) {
      setError(true);
    } else {
      setIsLoading(true);
      //call api update comment
      console.log("data", comment.description);
      const response = await userService.editComment(
        comment.id,
        comment.description
      );
      if (response !== 200) {
        console.log("data1", response);
        toast.warning("Warning Notification !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (response === 200) {
        setIsLoading(false);
        handlEditSuccess && handlEditSuccess(comment);
        setComment({
          ...comment,
          hasEdit: false,
        });
      }
      // setTimeout(() => {
      //   setIsLoading(false);
      //   setComment({
      //     ...comment,
      //     hasEdit: false,
      //   });
      // }, 1000)
    }
  };

  useEffect(() => {
    setComment({
      ...comment,
      description: data.description,
      hasEdit: data.hasEdit,
    });
  }, [data.hasEdit]);

  useEffect(() => {
    setComment(data);
  }, [data.id]);

  if (comment.hasEdit)
    return (
      <div className="comment_user">
        <img
          className="comment_user_avatar"
          src={
            comment?.user?.url_img ||
            "https://jp.boxhoidap.com/boxfiles/cach-de-anh-dai-dien-dep--f85ddf18094383e085fb97258c9c8d87.wepb"
          }
          alt=""
        />
        <input
          className="comment_user-input"
          placeholder="Comment....."
          // ref={refInputComment}
          
          value={comment?.description}
          onChange={(e) => {
            setComment({ ...comment, description: e.target.value });
          }}
        ></input>
        {/* {error && comment.description.length <= 0 ? (
          <label>Comment can not be Empty</label>
        ) : (
          " "
        )} */}
        <button
          class="btn btn-primary"
          type="submit"
          disabled={isLoading}
          onClick={handleWriterComment}
        >
          {isLoading ? `Loading..` : `Updated`}
        </button>
      </div>
    );
  return (
    <div className="comment_others" >
      <img
        className="comment_others_avatar"
        src={
          comment?.user?.url_img ||
          "https://jp.boxhoidap.com/boxfiles/cach-de-anh-dai-dien-dep--f85ddf18094383e085fb97258c9c8d87.wepb"
        }
        alt=""
      />
      <div className="comment_others-infor">
        <div className="comment_others-infor-cmt">
          <p className="comment_others-name">{comment?.user?.username}</p>
          <span className="comment_others-content">{comment?.description}</span>
        </div>
          <div className="comment_others-content-actions-list">
          <p className="comment_others-action"> Like</p>
        <p
          className="comment_others-action"
          onClick={() => {
            handleDeleteComment(comment.id);
          }}
        >
          <ToastContainer />
          Delete
        </p>
        <p
          className="comment_others-action"
          onClick={() => {
            handleEditComment(comment.id);
          }}
        >
          <ToastContainer />
          Edit
        </p>
        <span className="comment_others-action">
          {comment?.created_at?.toString().slice(0, 10)}
        </span>
          </div>
      </div>
    </div>
  );
};

export default Comment;