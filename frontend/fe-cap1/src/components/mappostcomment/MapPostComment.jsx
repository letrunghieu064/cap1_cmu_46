import Header from "../Header";
import ListPersonPost from "../listpersonpost/ListPersonPost";
import React, {  useEffect} from "react";
export default function MapPostComment({ comment, handleDeleteComment ,callbackItem}) {
  const handleDelete = async (e) => {
    handleDeleteComment && handleDeleteComment(comment.id);
  };
  useEffect(() => {
    callbackItem && callbackItem(comment)
  }, );
  return (
    <div>
      <div className="modal-content-comment-content-comment-read">
        <img
          src={
            comment?.user?.url_img ||
            "https://jp.boxhoidap.com/boxfiles/cach-de-anh-dai-dien-dep--f85ddf18094383e085fb97258c9c8d87.wepb"
          }
          alt=""
        />
        <div className="modal-content-comment-content-comment-read-letter">
          <p className="comment-content-comment-read-letter-name">
            {comment?.user?.username}
          </p>
          <p className="comment-content-comment-read-letter-time">
            11 minutes ago
          </p>
          <p className="comment-content-comment-read-letter-writed">
            {" "}
            {comment?.description}
          </p>
          <p
            className="comment-content-comment-read-letter-writed"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      </div>
    </div>
  );
}
