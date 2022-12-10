import React, { useState, useEffect } from "react";
import "./Profile.css";
import { FiEdit } from "react-icons/fi";
import { useSelector } from "react-redux";
import Header from "./Header";
import userService from "../services/user.service";
import axios from "axios";
const EditProfile = () => {
  const currentUser = useSelector((state) => state.auth);
  console.log(" user khiem", currentUser.user.data)
  const idUser = currentUser.user.data.id;
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
  // const [email,setEmail] = useState("")
  // const [first_name,setFirstName] = useState("")
  // const [last_name,setLastName] = useState("")
  // const [username,setUserName] = useState("")
  // const [birthday,setBirthDay] = useState("")
  //const [url_img,setURLImg] = useState("")
  // const [phone_number,setPhoneNumber] = useState("")
  // const [address,setAddress] = useState("")
  // const [gender,setGender] = useState("")
  // const [card_id,setCardID] = useState("")
  // const [dataSendFinal,setDataSendFinal] = useState({})
  // let dataSend = {
  //   email,
  //   first_name,
  //   last_name,
  //   username,
  //   birthday,
  //   phone_number,
  //   address,
  //   gender,
  //   card_id
  // }
  
  const handleChange = (e) => {
    console.log("test", e.target.value);
    setData({
     // ...data,
      [e.target.name]: e.target.value,
    });
  };
  // const handleSudmit = () => {
  //   // console.log("curent",currentUser.data.id)
  //   alert("bạn có chắc chắn lưu không");
  //   console.log("data1",data)
  //   return userService
  //     .editProfile(
  //       currentUser.data.id,
  //       {...data}
  //     )
  //     .then((response) => {
  //       // console.log(response);
  //     });
  // };
  // const handleChange = (e) => {
  //   console.log("test", e.target.value);
  //   setData({
  //     ...data,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  const handleUploadIamge = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        setData({
          ...data,
          url_img: reader.result,
        });
      };
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await userService.getUser(idUser);
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
    };
    fetchData();
  }, []);

  const updateProfile =async (e) => {
    e.preventDefault()
   
    // const formData = new FormData()
    // formData.append('name', name)
    // axios
    
     const res = await userService
      .editProfile(
        currentUser.user.data.id,
        // dataSendFinal
        {...data}
      )
      console.log("res update", res)
  }
  return (
    // <form onSubmit={updateProfile}>
      <div>
      <Header></Header>
      <div className="box-container">
        <div className="box1">
          <div className="image-user">
            <img
              className="img"
              src="https://jp.boxhoidap.com/boxfiles/cach-de-anh-dai-dien-dep--f85ddf18094383e085fb97258c9c8d87.wepb"
              alt="avt"
            ></img>
            <a href="">
              <FiEdit className="edit-icon"></FiEdit>
            </a>
          </div>
          <input type="file" onChange={handleUploadIamge} />
          <div className="user-name">
            <h3 className="name">{currentUser.user.data.username}</h3>
          </div>
        </div>

        <div className="box2">
          <h1 className="edit-text">Edit Profile</h1>
          <div className="info">
            <div className="full-name">
              <div className="gene firt-name ">
                <input
                  type="text"
                  placeholder="First Name"
                  name="first_name"
                  value={data.first_name}
                  size="27"
                  onChange={e => handleChange(e.target.value)}
                ></input>
              </div>
              <div className="gene last-name">
                <input
                  type="text"
                  name="last_Name"
                  placeholder="Last Name"
                  size="27"
                  value={data?.last_name}
                  onChange={e => handleChange(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="user-name__input">
              <div className="gene name-input">
                <input
                  type="text"
                  size="47"
                  placeholder="Username"
                  name="username"
                  value={data?.username}
                  onChange={e => handleChange(e.target.value)}
                ></input>
              </div>
              <div className="gene gender">
                <select
                  className="input"
                  name="gender"
                  onChange={(e) => {
                    handleChange(e.target.value);
                  }}
                >
                  <option value="Female">Nữ</option>
                  <option value="Male">Nam</option>
                  <option value="Other">Khác</option>
                </select>
              </div>
            </div>
              <div className="gene genhandleUploadIamgeil">
                <input
                  type="text"
                  placeholder="abc@gmail.com"
                  size="39"
                  name="email"
                  value={data?.email}
                  onChange={e => handleChange(e.target.value)}
                ></input>
              </div>
              <div className="gene birthday">
                <input
                  className="birthday__input"
                  type="date"
                  name="birthday"
                  value={data.birthday}
                  onChange={e => handleChange(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="ID-Phone__input">
              <div className="gene id-card">
                <input
                  type="text"
                  placeholder="ID Card"
                  size="27"
                  value={data?.card_id}
                  onChange={e => handleChange(e.target.value)}
                ></input>
              </div>
      
              <div className="gene phone">
                <input
                  type="text"
                  placeholder="Phone Number"
                  size="27"
                  value={data?.phone_number}
                  onChange={e => handleChange(e.target.value)}
                ></input>
      
              </div>
      
            </div>

            <div className="gene address__input">
              <input
                type="text"
                placeholder="Address"
                size="58"
                value={data?.address}
                onChange={e => handleChange(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="button">
            <button type="submit"class="btn btn-save "  onClick={updateProfile}>
              Save
            </button>
            <button type="button" class="btn btn-cancel">
              Cancel
            </button>
          </div>
        </div>
     </div>
  );
};

export default EditProfile;
