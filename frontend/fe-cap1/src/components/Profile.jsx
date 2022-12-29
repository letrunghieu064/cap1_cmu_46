import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
   <div classname="container">
  <div className="header-profile">
    <img className="header-profile-img" src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" alt />
    <h1 className="header-profile-namesuer">Lê Kim Ngân</h1>
  </div>
  <div className="body-profile">
    <div className="body-profile-left">
      <ul className="profile-left-info">
        <li className="profile-left-info-item">
          <h4 className="profile-left-title">Full Name</h4>
          <p className="profile-infoo">Le Kim Ngan</p>
        </li>
        <li className="profile-left-info-item">
          <h4 className="profile-left-title">User Name</h4>
          <p className="profile-infoo">nganle263</p>
        </li>
        <li className="profile-left-info-item">
          <h4 className="profile-left-title">Gender</h4>
          <p className="profile-infoo">Female</p>
        </li>
        <li className="profile-left-info-item">
          <h4 className="profile-left-title">Birthday</h4>
          <p className="profile-infoo">26/03/2001</p>
        </li>
        <li className="profile-left-info-item">
          <h4 className="profile-left-title">ID Card</h4>
          <p className="profile-infoo">206377355</p>
        </li>
        <li className="profile-left-info-item">
          <h4 className="profile-left-title">Phone Number</h4>
          <p className="profile-infoo">0777969552</p>
        </li>
        <li className="profile-left-info-item">
          <h4 className="profile-left-title">Email Address</h4>
          <p className="profile-infoo">kimngan2603@gmail.com</p>
        </li>
        <li className="profile-left-info-item">
          <h4 className="profile-left-title">Address</h4>
          <p className="profile-infoo">20 Ham Nghi/Thac Gian/Thanh Khe/Da Nang</p>
        </li>
      </ul>
      <button className="buttono-profile-edit">
        Edit
      </button>
    </div>
    <div className="body-profile-right">
      <div className="body-profile-right-postitem">
        <div className="body-profile-header">
          <img src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" alt /> 
          <div>
            <p>Le Kim Ngan</p>
            <p className="time-post-profile">1 giờ</p>
          </div>      
        </div>
        <div className="body-profile-content">
          <p> ngan Ngan ngan Ngan  ngan Ngan ngan Ngan ngan</p>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS51RWFkvb4NHdZ1CS7Tsl2492hU4climikA&usqp=CAU" alt />
        </div>
      </div>
      <div className="body-profile-right-postitem">
        <div className="body-profile-header">
          <img src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" alt /> 
          <div>
            <p>Le Kim Ngan</p>
            <p className="time-post-profile">1 giờ</p>
          </div>      
        </div>
        <div className="body-profile-content">
          <p> ngan </p>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS51RWFkvb4NHdZ1CS7Tsl2492hU4climikA&usqp=CAU" alt />
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Profile;
