import React ,{useState,useEffect}from "react";
import "./ListPersonPost.css";
import userService from "../../services/user.service";
// import axios from "axios";
import { useSelector } from "react-redux";
import PersonPost from "../personPost/PersonPost";
export default function ListPersonPost() {
  const handleClickEdit =(e)=>{
    e.preventDefault();
   
    window.location.replace("/profile");
    
  }
  const [posts,setPosts]=useState([])
  const [data, setData] = useState({
    email:"",
    first_name:"",
    last_name:"",
    username:"",
    birthday:"",
    phone_number:"",
    address:"",
    gender:"",
    card_id:"",
    url_img:""
  })
  const onDelete = (id) => {
    const newPosts = posts.filter((item) => item.id !== id);
    setPosts(newPosts);
  };
  const callbackpost =(postitem)=>{
    const newPosts = posts.map(el => {   
      if(el.id === postitem.id) { 
          el=postitem;
      }
      return el;
    })
    setPosts(newPosts)
  }
  const { user: currentUser } = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchData = async () => {
      const res = await userService.getUser(currentUser?.data?.id);
      console.log("res",res)
      setData({
        email:res.email,
        first_name:res.first_name,
        last_name:res.last_name,
        username:res.username,
        birthday:res.birthday,
        phone_number:res.phone_number,
        address:res.address,
        gender:res.gender,
        card_id:res.card_id
      });
      setPosts(res.posts)
    };
    fetchData();
    
  }, []);

  return (

   <div>
  <div className="header-profile">
    <img className="header-profile-img" src={data?.url_img || "https://jp.boxhoidap.com/boxfiles/cach-de-anh-dai-dien-dep--f85ddf18094383e085fb97258c9c8d87.wepb"} alt="" />
    <h1 className="header-profile-namesuer">{currentUser?.data?.username}</h1>
  </div>
  <div className="body-profile">
    <div className="body-profile-left">
      <ul className="profile-left-info">
        <li className="profile-left-info-item">
          <h4 className="profile-left-title">Full Name</h4>
          <p className="profile-infoo">{data?.first_name +" "}  {data?.last_name}</p>
        </li>
        <li className="profile-left-info-item">
          <h4 className="profile-left-title">User Name</h4>
          <p className="profile-infoo">{data?.username}</p>
        </li>
        <li className="profile-left-info-item">
          <h4 className="profile-left-title">Gender</h4>
          <p className="profile-infoo">{data?.gender}</p>
        </li>
        <li className="profile-left-info-item">
          <h4 className="profile-left-title">Birthday</h4>
          <p className="profile-infoo">{data?.birthday}</p>
        </li>
        <li className="profile-left-info-item">
          <h4 className="profile-left-title">ID Card</h4>
          <p className="profile-infoo">{data?.card_id}</p>
        </li>
        <li className="profile-left-info-item">
          <h4 className="profile-left-title">Phone Number</h4>
          <p className="profile-infoo">{data?.phone_number}</p>
        </li>
        <li className="profile-left-info-item">
          <h4 className="profile-left-title">Email Address</h4>
          <p className="profile-infoo">{data?.email}</p>
        </li>
        <li className="profile-left-info-item">
          <h4 className="profile-left-title">Address</h4>
          <p className="profile-infoo">{data?.address}</p>
        </li>
      </ul>
      <a className="buttono-profile-edit" onClick={handleClickEdit}>
        Edit
      </a>
    </div>
    <div className="body-profile-right">
    {posts.map((post, index) => (
            <PersonPost
            onDelete={onDelete}
            callbackpost ={callbackpost}
              data={data}
              post={post}
              key={`post-item-${index}`}
            />
          ))}
   </div>       
  </div>
  </div>
  );
}