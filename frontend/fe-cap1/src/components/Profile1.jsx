import React, { useState, useEffect } from "react";
import "./Profile.css";
import { FiEdit } from "react-icons/fi";
import { useSelector } from "react-redux";
import Header from "./Header";
import userService from "../services/user.service";
import Person from "./person/Person";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const EditProfile = () => {
  const currentUser = useSelector((state) => state.auth);
  console.log(" user khiem", currentUser?.user?.data);
  const idUser = currentUser?.user?.data?.id;
  const [error, setError] = useState(0);
  const [errorCard, setErrorCard] = useState(false);
  const [data, setData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    username: "",
    birthday: "",
    phone_number: "",
    address: "",
    gender: "",
    card_id: "",
    url_img: "",
  });

  const handleChange = (e) => {
    console.log("test", e.target.value);
    setData({
      ...data,
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
  const validatePhoneNumber = () => {
    const PHONE_REGEX = new RegExp(
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i
    );
    if (data?.phone_number === "") {
      setError(0);
      return false;
    } else if (!PHONE_REGEX.test(data?.phone_number)) {
      setError(1);
      return false;
    } else if (data?.phone_number?.length !== 10 ) {
      setError(2);
      return false;
    }
    return true;
   
  };
  const validateCardId = () => {
    if ( data?.card_id?.length !== 12  ) {
      setErrorCard(true);
      return false;
    }
    return true;
   
  };
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
      console.log("res", res);
      setData({
        email: res.email,
        first_name: res.first_name,
        last_name: res.last_name,
        username: res.username,
        birthday: res.birthday,
        phone_number: res.phone_number,
        address: res.address,
        gender: res.gender,
        card_id: res.card_id,
      });
    };
    fetchData();
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();
    console.log("data", data);
     validatePhoneNumber();
     validateCardId();
     console.log("check", validatePhoneNumber(),validateCardId());
    if (validatePhoneNumber() &&  validateCardId() ) {
    
      const res = await userService.editProfile(currentUser.user.data.id, {
        ...data,
      });
    
      toast.success('Update Success  !', {
        position: toast.POSITION.TOP_RIGHT
    });
    
    
    }
    if(validatePhoneNumber() && error   ){
     
      setError(3)
     
    }
  };
  const Comback = (e) => {
    e.preventDefault();
    window.location.replace("/Person");
  };
  const Cancel = async () => {
    const res = await userService.getUser(idUser);
    setData({
      email: res.email,
      first_name: res.first_name,
      last_name: res.last_name,
      username: res.username,
      birthday: res.birthday,
      phone_number: res.phone_number,
      address: res.address,
      gender: res.gender,
      card_id: res.card_id,
    });
  };
  return (
    <div>
      <Header></Header>
      <div className="edit-profile-container">
        <div className="edit-profile-container-left">
          <div className="edit-profile-container-left-img">
            <div>
              <label htmlFor="edit-profile-container-left-inputfile">
                <img
                  src={
                    data?.url_img ||
                    "https://jp.boxhoidap.com/boxfiles/cach-de-anh-dai-dien-dep--f85ddf18094383e085fb97258c9c8d87.wepb"
                  }
                  alt
                />
              </label>
            </div>
          </div>
          <div className="edit-profile-container-left-role">
            <h3>Admin</h3>
            <input type="file" id="edit-profile-container-left-inputfile" />
          </div>
        </div>
        <div className="edit-profile-container-right">
          <h1 className="edit-profile-container-right-header">Edit profile</h1>
          <div className="edit-profile-container-right-body">
            <div className="edit-profile-container-right-body-left">
              <div className="container-right-body-item">
                <span>First Name </span>
                <input
                  type="text"
                  placeholder="First Name"
                  name="first_name"
                  value={data.first_name}
                  onChange={handleChange}
                />
              </div>
              <div className="container-right-body-item">
                <span>Last Name </span>
                <input
                  type="text"
                  placeholder="Last Name"
                  name="last_name"
                  value={data.last_name}
                  onChange={handleChange}
                />
              </div>
              <div className="container-right-body-item">
                <span>User Name </span>
                <input
                  placeholder="Username"
                  value={data.username}
                  type="text"
                  onChange={handleChange}
                />
              </div>
              <div className="container-right-body-item">
                <span>Phone Number </span>
                <input
                  type="text"
                  placeholder="Phone Number"
                  name="phone_number"
                  value={data?.phone_number}
                  onChange={handleChange}
                />
                {error ===0  && data?.phone_number?.length <=0 ?(
                <label id="errorComment">không để  trống phone number </label> ): error ===1 ?
              ( <label id="errorComment">không phải số </label>): error ===2 && data?.phone_number?.length !==10 ? ( <label id="errorComment">số điện thoại không ít và  hơn 10 kí tự </label>) :""}
              </div>
            </div>
            <div className="edit-profile-container-right-body-right">
              <div className="container-right-body-right-item">
                <div className="container-right-body-item">
                  <span>Address </span>
                  <input
                    type="text"
                    placeholder="Address"
                    name="address"
                    value={data?.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="container-right-body-item">
                  <span>Card id </span>
                  <input
                    type="text"
                    placeholder="Card id"
                    name="card_id"
                    value={data?.card_id}
                    onChange={handleChange}
                  />
                  {errorCard && data.card_id.length !==12  ? (<label id="errorComment">CardID phải có 12 kí tự  </label> ):""}
                </div>
                <div className="container-right-body-item">
                  <span>Email </span>
                  <input placeholder="email" type="text" value={data.email} />
                </div>
                <div className="container-right-body-item">
                  <span>Date Of Birth </span>
                  <input
                    placeholder="Date Of Birth"
                    type="date"
                    name="birthday"
                    value={data?.birthday}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="edit-profile-container-right-body-bottom">
              <div className="container-right-body-bottom-gender">
                <span>Gender</span>
                <select className="input" name="gender" onChange={handleChange}>
                  <option value="Female">Nữ</option>
                  <option value="Male">Nam</option>
                  <option value="Other">Khác</option>
                </select>
              </div>
              <div className="container-right-body-bottom-submit">
                <a
                  href
                  className="container-right-body-bottom-submit-cancel"
                  onClick={Comback}
                >
                  Về trang Edit
                </a>
                <a
                  href
                  className="container-right-body-bottom-submit-cancel"
                  onClick={Cancel}
                >
                  Cancel
                </a>
                <a
                  href
                  className="container-right-body-bottom-submit-ok"
                  onClick={updateProfile}
                >
                  Update
                </a>
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
