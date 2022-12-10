import React, { useState, useEffect } from "react";
import userService from "../../services/user.service";
import { useSelector} from "react-redux";
import "./Comment.css";
const Comment = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [writerComment, setWriterComment] = useState("");
  const { user: currentUser } = useSelector((state) => state.auth);
  const [error,setError]=useState(false);
  useEffect(() => {
  
    const res = userService
      .getComments(postId)
      .then((comment) => {
        console.log("comments",comment)
        setComments(comment);
        return comment;
      })
      .catch((error) => {
        console.error(error);
      });
    
  }, [postId]);

  const handleWriterComment = async (e) => {
    e.preventDefault();
    if (writerComment.length=== 0) {
     setError(true)
    } else {
      const res = await userService.createComment(postId, writerComment);
      console.log("res1",res)
      setComments([{ ...res }, ...comments]);
    }
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
      alert(
        " xoá không thành công , bạn không thể xóa bình luận của người khác"
      );
    }
    if (response === 200) {
      onDeleteComment(id);
    }
  };

  const handleEditComment = async (id) => {
    const newComments = comments.map(el => {
      el.hasEdit = false;
      if(el.id === id) el.hasEdit = true;
      return el;
    })
    setComments(newComments)
    
  };

  return (
    <div className="comment">
      <div className="comment_user">
        <img
          className="comment_user_avatar"
          src={currentUser?.data?.url_img || "https://jp.boxhoidap.com/boxfiles/cach-de-anh-dai-dien-dep--f85ddf18094383e085fb97258c9c8d87.wepb"}
          alt=""
        />
        <input
          className="comment_user-input"
          placeholder= { currentUser?.data?.username + " bạn đang nghĩ gì ?"} 
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
      {error&& writerComment.length <=0 ?
        <label id="errorComment">comment can not be Empty</label> :" "}
      {comments.map((com, index) => (
        <CommentItem
          data={com}
          key={`comment-${postId}-${index}`}
          handleDeleteComment={handleDeleteComment}
            handleEditComment={handleEditComment}
        />
      ))}
      <div className="comment_view-morer">
        <p>Xem thêm bình luận</p>
      </div>
    </div>
  );
};

const CommentItem = ({ data, handleDeleteComment, handleEditComment }) => {
  const [comment, setComment] = useState(data);
  const [isLoading, setIsLoading] = useState(false);
  const [error,setError]=useState(false);
  const handleWriterComment = async (e) => {
    e.preventDefault();
    if (comment.description.length === 0) {
      setError(true);
    } else {
      
      setIsLoading(true);
      //call api update comment
      console.log("data",comment.description)
      const response=  await userService.editComment(comment.id,comment.description)
      if (response !== 200) {
        alert(
          " chỉnh sửa không thành công "
        );
      }
      if (response === 200) {
          setIsLoading(false);
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
      hasEdit: data.hasEdit
    })
  }, [data.hasEdit])


  
  if (comment.hasEdit)
    return (
      <div className="comment_user">
        <img
          className="comment_user_avatar"
          src={comment?.user?.url_img || "https://jp.boxhoidap.com/boxfiles/cach-de-anh-dai-dien-dep--f85ddf18094383e085fb97258c9c8d87.wepb"}
          alt=""
        />
        <input
          className="comment_user-input"
          placeholder="Viết bình luận"
          // ref={refInputComment}
          value={comment?.description}
          onChange={(e) => {
            setComment({...comment, description: e.target.value});
          }}
        ></input>
         {error&& comment.description.length <=0 ?
        <label>comment can not be Empty</label> :" "}
        <button
          class="btn btn-primary"
          type="submit"
          disabled={isLoading}
          onClick={handleWriterComment}
        >
          {isLoading ? `Loading..` : `Cap nhat`}
        </button>
      </div>
    );
  return (
    <div className="comment_others">
      <img
        className="comment_others_avatar"
        src={comment?.user?.url_img || "https://jp.boxhoidap.com/boxfiles/cach-de-anh-dai-dien-dep--f85ddf18094383e085fb97258c9c8d87.wepb"}
        alt=""
      />
      <div className="comment_others-infor">
        <div className="comment_others-infor-cmt">
          <p className="comment_others-name">{comment?.user?.username}</p>
          <span className="comment_others-content">{comment?.description}</span>
        </div>
        <p className="comment_others-action"> Thích</p>
        <p
          className="comment_others-action"
          onClick={() => {
            handleDeleteComment(comment.id);
          }}
        >
          xoá
        </p>
        <p
          className="comment_others-action"
          onClick={() => {
            handleEditComment(comment.id);
          }}
        >
          chỉnh sửa
        </p>
        <span className="comment_others-action">
          {comment?.created_at?.toString().slice(0, 10)}
        </span>
      </div>
    </div>
  );
};

export default Comment;
