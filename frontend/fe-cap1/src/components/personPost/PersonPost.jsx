import React,{useState} from "react";
import userService from "../../services/user.service";
import EditPost from "../editpost/EditPost";
const PersonPost = ({post,data,onDelete, callbackpost}) => {
const [createModal,setCreateModal]=useState(false);
const [postitem,setPostItem]=useState({});
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
  const handleCreateModal =(e)=>{
    
    setPostItem(post)
    setCreateModal(!createModal)
  }
  const callbackCreateSuccess = (postitem) => {
    console.log("res1", postitem);
    setPostItem(postitem);
    callbackpost && callbackpost(postitem.data)
  };

  return (
    // <form onSubmit={updateProfile}>
    <div>
      <div className="body-profile-right">
        <div className="body-profile-header">
          <img
            src={
              data?.url_img ||
              "https://jp.boxhoidap.com/boxfiles/cach-de-anh-dai-dien-dep--f85ddf18094383e085fb97258c9c8d87.wepb"
            }
            alt=""
          />
          <div>
            <p>{data?.username}</p>
            <p className="time-post-profile">
              {" "}
              {post?.created_at?.toString().slice(0, 10)}
            </p>
            <button onClick={() => handleDeletePost(post.id)} > Xóa </button>
            <button onClick={handleCreateModal}  > chỉnh sửa </button>
          </div>
        </div>
        <div className="body-profile-content">
          <p>
            {post?.description}
          </p>
          <img
            src={post?.img_url}
            alt=""
          />
        </div>
      </div>
      { createModal &&(
        <EditPost  onClose={handleCreateModal} postItem={postitem} callbackCreateSuccess={callbackCreateSuccess} >
        </EditPost>

      )}
    </div>
  );
};

export default PersonPost;