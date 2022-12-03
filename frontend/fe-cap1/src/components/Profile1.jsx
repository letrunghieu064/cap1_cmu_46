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
  const [data, setData] = useState({})
  const [email,setEmail] = useState(currentUser.user.data.email)
  const [first_name,setFirstName] = useState(currentUser.user.data.first_name)
  const [last_name,setLastName] = useState(currentUser.user.data.last_name)
  const [username,setUserName] = useState(currentUser.user.data.username)
  const [birthday,setBirthDay] = useState(currentUser.user.data.birthday)
  const [url_img,setURLImg] = useState(currentUser.user.data.url_img)
  const [phone_number,setPhoneNumber] = useState(currentUser.user.data.phone_number)
  const [address,setAddress] = useState(currentUser.user.data.address)
  const [gender,setGender] = useState(currentUser.user.data.gender)
  const [card_id,setCardID] = useState(currentUser.user.data.card_id)
  const [dataSendFinal,setDataSendFinal] = useState({})
  let dataSend = {
    email,
    first_name,
    last_name,
    username,
    birthday,
    phone_number,
    address,
    gender,
    card_id
  }
  

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
        console.log("img url khiem", reader.result)
        setURLImg(reader.result );
      };
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await userService.getUser(idUser);
      setData(res);
    };
    fetchData();
  }, []);

  const updateProfile =async (e) => {
    e.preventDefault()
    setDataSendFinal(dataSend)
    console.log("da ta send final", dataSendFinal);
    // const formData = new FormData()
    // formData.append('name', name)
    // axios
    
     const res = await userService
      .editProfile(
        currentUser.user.data.id,
        // dataSendFinal
        email,
        first_name,
        last_name,
        username,
        url_img,
        birthday,
        phone_number,
        address,
        gender,
        card_id
      )
      console.log("res update", res)
  }
  return (
    <form onSubmit={updateProfile}>
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
                  defaultValue={data.first_name}
                  value={first_name}
                  size="27"
                  onChange={e => setFirstName(e.target.value)}
                ></input>
              </div>
              <div className="gene last-name">
                <input
                  type="text"
                  name="last_Name"
                  placeholder="Last Name"
                  size="27"
                  defaultValue={data.last_name}
                  value={last_name}
                  onChange={e => setLastName(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="user-name__input">
              <div className="gene name-input">
                <input
                  type="text"
                  size="47"
                  name="username"
                  defaultValue={data.username}
                  value={username}
                  onChange={e => setUserName(e.target.value)}
                ></input>
              </div>
              <div className="gene gender">
                <select
                  className="input"
                  name="gender"
                  onChange={(e) => {
                    setGender(e.target.value);
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
                  value={email}
                  defaultValue={data.email}
                  onChange={e => setEmail(e.target.value)}
                ></input>
              </div>
              <div className="gene birthday">
                <input
                  className="birthday__input"
                  type="date"
                  name="birthday"
                  defaultValue={data.birthday}
                  value={birthday}
                  onChange={e => setBirthDay(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="ID-Phone__input">
              <div className="gene id-card">
                <input
                  type="text"
                  placeholder="ID Card"
                  size="27"
                  defaultValue={data.card_id}
                  value={card_id}
                  onChange={e => setCardID(e.target.value)}
                ></input>
              </div>
      
              <div className="gene phone">
                <input
                  type="text"
                  placeholder="Phone Number"
                  size="27"
                  defaultValue={data.phone_number}
                  value={phone_number}
                  onChange={e => setPhoneNumber(e.target.value)}
                ></input>
      
              </div>
      
            </div>

            <div className="gene address__input">
              <input
                type="text"
                placeholder="Address"
                size="58"
                defaultValue={data.address}
                onChange={e => setAddress(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="button">
            <button type="submit"class="btn btn-save " >
              Save
            </button>
            <button type="button" class="btn btn-cancel">
              Cancel
            </button>
          </div>
        </div>
    </form>
  );
};

export default EditProfile;
