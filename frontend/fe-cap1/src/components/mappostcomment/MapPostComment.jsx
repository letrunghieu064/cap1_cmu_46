import Header from "../Header";
import ListPersonPost from "../listpersonpost/ListPersonPost"
export default function MapPostComment({comment ,handleDeleteComment}) {
  
  const handleDelete = async (e) => {
    handleDeleteComment && handleDeleteComment(comment.id)
  }
  return (
    <div>
      <div className="modal-content-comment-content-comment-read">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiGxpPkOa9f5LzIgUoOswNCmnIA_DwaufG-A&usqp=CAU" />
                    <div className="modal-content-comment-content-comment-read-letter">
                      <p className="comment-content-comment-read-letter-name">{comment?.user?.username}</p>
                      <p className="comment-content-comment-read-letter-time">11 minutes ago</p>
                      <p className="comment-content-comment-read-letter-writed"> {comment?.description}</p>
                      <p className="comment-content-comment-read-letter-writed" onClick={handleDelete}>Delete</p>
                    </div>
        </div>
    </div>
  );
}
