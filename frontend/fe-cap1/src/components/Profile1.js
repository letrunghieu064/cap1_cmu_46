import React, { useState } from "react";
import "./Profile.css";
import { FiEdit } from "react-icons/fi";
import { useSelector } from "react-redux";
import Header from "./Header";
import userService from "../services/user.service";
const EditProfile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const [fisrtName, setFisrtName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [gender, setGenDer] = useState("Female");
  const [email, setEmail] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [IDCard, setIDCard] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [imgurl, setImgUrl] = useState("");
  const handleSudmit = () => {
    alert("bạn có chắc chắn lưu không");
    return userService
      .editProfile(
        fisrtName,
        lastName,
        gender,
        email,
        birthDay,
        IDCard,
        phoneNumber,
        address,
        imgurl
      )
      .then((response) => {
        console.log(response);
      });
  };
  const handleUploadIamge = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        console.log("base", reader.result);
        setImgUrl(reader.result);
      };
    }
  };
  return (
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
            <h3 className="name">{currentUser.username}</h3>
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
                  value={fisrtName}
                  onChange={(e) => setFisrtName(e.target.value)}
                  size="27"
                ></input>
              </div>
              <div className="gene last-name">
                <input
                  type="text"
                  placeholder="Last Name"
                  size="27"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="user-name__input">
              <div className="gene name-input">
                <input
                  type="text"
                  placeholder={currentUser.username}
                  size="47"
                ></input>
              </div>
              <div className="gene gender">
                <select
                  className="input"
                  name="gender"
                  value={gender}
                  onChange={(e) => {
                    setGenDer(e.target.value);
                  }}
                >
                  <option value="Female">Nữ</option>
                  <option value="Male">Nam</option>
                  <option value="Other">Khác</option>
                </select>
              </div>
            </div>

            <div className="email-birth__input">
              <div className="gene email">
                <input
                  type="text"
                  placeholder={currentUser.email}
                  size="39"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></input>
              </div>
              <div className="gene birthday">
                <input
                  className="birthday__input"
                  type="date"
                  value={birthDay}
                  onChange={(e) => {
                    setBirthDay(e.target.value);
                  }}
                ></input>
              </div>
            </div>

            <div className="ID-Phone__input">
              <div className="gene id-card">
                <input
                  type="text"
                  placeholder="ID Card"
                  size="27"
                  value={IDCard}
                  onChange={(e) => {
                    setIDCard(e.target.value);
                  }}
                ></input>
              </div>
              <div className="gene phone">
                <input
                  type="text"
                  placeholder="Phone Number"
                  size="27"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                ></input>
              </div>
            </div>

            <div className="gene address__input">
              <input
                type="text"
                placeholder="Address"
                size="58"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              ></input>
            </div>

            <div className="pass__input">
              <div className="gene password">
                <input type="password" placeholder="Password" size="27"></input>
              </div>
              <div className="gene confirm">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  size="27"
                ></input>
              </div>
            </div>
          </div>
          <div className="button">
            <button type="button" class="btn btn-save " onClick={handleSudmit}>
              Save
            </button>
            <button type="button" class="btn btn-cancel">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
