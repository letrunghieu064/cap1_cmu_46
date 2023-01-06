import React,{useState} from "react";
import userService from "../../services/user.service";
import EditPost from "../editpost/EditPost";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const PersonPost = ({post,data,onDelete, callbackpost}) => {
const [createModal,setCreateModal]=useState(false);
const [postitem,setPostItem]=useState({});
const [idpost,setIdPost]= useState(-1);
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = (id) =>{
  setShow(true) 
  setIdPost(id)
 } 
  const handleDeletePost = async () => {
    const response = await userService.deletePost(idpost);
    console.log("res", response);
    if (response !== 200) {
      alert(" Failed to delete post ");
    }
    if (response === 200) {
      onDelete(idpost);
      setShow(!show)
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
    <div className="body-profile-right-postitem">
        <div className="body-profile-header">
          <img
            src={
              data?.url_img ||
              "https://jp.boxhoidap.com/boxfiles/cach-de-anh-dai-dien-dep--f85ddf18094383e085fb97258c9c8d87.wepb"
            }
            alt=""
          />
          <div className="body-profile-header-time-name">
          <p>{data?.username}</p>
           <p className="time-post-profile">
              {" "}
              {post?.created_at?.toString().slice(0, 10)}
            </p>
          </div>
          <div className="body-profile-content-actionnns">
           
            
           <button className="body-profile-content-actionnns-icon buttono-profile-edit-delete"     onClick={ () => {
                              handleShow(post?.id)
                              // handleDeletePost(post?.id);
                            }} > Delete </button>
           <button className="body-profile-content-actionnns-icon" onClick={handleCreateModal}  > Edit post </button>
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
        
      { createModal &&(
        <EditPost  onClose={handleCreateModal} postItem={postitem} callbackCreateSuccess={callbackCreateSuccess} >
        </EditPost>

      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>Are you want to delete this post??</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDeletePost} >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PersonPost;
