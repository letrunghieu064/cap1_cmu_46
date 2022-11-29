import React, { useState, useEffect } from "react";
import userService from "../../services/user.service";

const Comment = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [writerComment, setWriterComment] = useState("");

  useEffect(() => {
    const res = userService
      .getComments(postId)
      .then((comment) => {
        setComments(comment);
        return comment;
      })
      .catch((error) => {
        console.error(error);
      });
  }, [postId]);

  const handleWriterComment = async (e) => {
    e.preventDefault();
    if (writerComment === "") {
      alert("bạn chưa bình luận");
    } else {
      const res = await userService.createComment(postId, writerComment);
      console.log("res",res)
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

  const handleWriterComment = async (e) => {
    e.preventDefault();
    if (comment.description === "") {
      alert("bạn chưa bình luận");
    } else {
      
      setIsLoading(true);
      //call api update comment
      
      setTimeout(() => {
        setIsLoading(false);
        setComment({
          ...comment,
          hasEdit: false,
        });
      }, 1000)
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
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiquxzRvxiQGtrn3rlBgGKAWixXBIhPWhOOw&usqp=CAU"
          alt=""
        />
        <input
          className="comment_user-input"
          placeholder="Viết bình luận"
          // ref={refInputComment}
          value={comment.description}
          onChange={(e) => {
            setComment({...comment, description: e.target.value});
          }}
        ></input>
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
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQztTqQRZ0RaSy0nVuhnzhEx3Rz9N88L8eWJg&usqp=CAU"
        alt=""
      />
      <div className="comment_others-infor">
        <div className="comment_others-infor-cmt">
          <p className="comment_others-name">{comment?.user?.username}</p>
          <span className="comment_others-content">{comment.description}</span>
        </div>
        <p className="comment_others-action">Thích</p>
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