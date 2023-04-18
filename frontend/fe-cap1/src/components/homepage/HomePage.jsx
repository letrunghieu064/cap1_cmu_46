import React,{useState} from "react";
import userService from "../../services/user.service";
import EditPost from "../editpost/EditPost";
import g46 from  "../../img/g46.jpg";
 import antrom from  "../../img/antrom.jpg";
import "./HomePage.css";
import { Route, Link, useLocation, Routes } from "react-router-dom";
import GoPage from "../gopage/GoPage";
import { IoNewspaperOutline } from "react-icons/io5";
import { BsMap } from "react-icons/bs";
import { BsShare } from "react-icons/bs";
const HomePage = () => {
  return (
    // <form onSubmit={updateProfile}>
   <div style={{background:"white"}}>
  <div>
    <div className="homepage-header">
      <img src={g46} alt />
      {/* <button>GET STARTED !  <Link to={"/login"} >
           
           </Link></button> */}
      <a href="http://localhost:3001/login" >  <button> GET STARTED! </button> </a>
    </div>
    <div className="homepage-intro-name-cap">
      <h2>Anti-Thieves &amp; Anti-Robbers</h2>
      <h5>Social Website</h5>
    </div>
    <div className="homepage-content-body-choose">
      <div className="homepage-content-body-chooses">
        <div className="homepage-content-body-chooses-item">
          <div className="homepage-content-body-chooses-item-img">
            <IoNewspaperOutline className="homepage-content-body-chooses-item-img-icon"></IoNewspaperOutline>
          </div>
          <h3>NEWS</h3>
          <p>Bringing the most recent information about local crime</p>
        </div>
        <div className="homepage-content-body-chooses-item">
          <div className="homepage-content-body-chooses-item-img">
            <BsMap className="homepage-content-body-chooses-item-img-icon"></BsMap>
          </div>
          <h3>MAP</h3>
          <p>View a map of the local area where there are robbers to avoid</p>
        </div>
        <div className="homepage-content-body-chooses-item">
          <div className="homepage-content-body-chooses-item-img">
            <BsShare className="homepage-content-body-chooses-item-img-icon"></BsShare>
          </div>
          <h3>SHARE</h3>
          <p>Post about problem having so that everyone can avoid it</p>
        </div>
      </div>
      <div className="homepage-content-body-choose-img">
        <img src={antrom} alt />
      </div>  
    </div>
  </div>
  <Routes>
        <Route path="/gopage" element={<GoPage />} />
  </Routes>
</div>
  )
};

export default HomePage;
