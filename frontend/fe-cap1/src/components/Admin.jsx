import React, { useState, useEffect, Fragment } from "react";
import "./Admin.css";
import { FiEdit, FiSearch, FiTrash } from "react-icons/fi";
import userService from "../services/user.service";
import Header from "./Header";
import axios from "axios";
import authHeader from "../services/auth-header";
import Exportexcel from '../util/constants/Exportexcel'
  
import { CiUser } from "react-icons/ci";
const Admin = () => {
  const [tab, setTab] = useState("user");

  const [users, setUsers] = useState([]);
  const [addpost, setaddpost] = useState([]);
  const handleTab = (value) => {
    setTab(value);
  };
  // useEffect(() => {
  //   const res = userService.getUsers();
  //   console.log("res", res);
  //   setUsers(res);
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      const result = await userService.getAllUser();
      console.log("result", result);
      setUsers(result);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData=async ()=>{
  const result= await  axios
      .get("http://localhost:3000/api/v1/posts",{ headers: authHeader() })
      .then((response) => {
        return response.data;
      })
      .then((result) => {
        // console.log("data",result);
        // const postlist = [...result];
        // setaddpost(postlist);
        return result;
        
      });
      console.log("data",result);
      const postlist = [...result];
      setaddpost(postlist);
    }
    fetchData();
  }, []);
  const onDeleteUser = (id) => {
    const user = users.filter((item) => item.id !== id);
    setUsers(user);
  };
  const handleDeleteUser = async (id) => {
    const response = await userService.deleteUser(id);

    console.log("response", response);
    if (response !== 200) {
      alert(" xoá không thành công ");
    }
    if (response === 200) {
      onDeleteUser(id);
    }
  };
  const onDeletePost = (id) => {
    const post = addpost.filter((item) => item.id !== id);
    setaddpost(post);
  };
  const handleDeletePost = async (id)=>{
    const response = await userService.deleteAdminPost(id);

    console.log("response", response);
    if (response !== 200) {
      alert(" xoá không thành công ");
    }
    if (response === 200) {
      onDeletePost(id);
    }
  }
  let handleOnClickExport= async()=>{
    alert("kakak")
    console.log("",addpost)
    if(addpost){
      await Exportexcel.exportExcel(addpost,"danh sách post","list")
    }
  }
  return (
    <div >
      <Header></Header>
      {/* <div className="container-user-body">
      <div className="container-user">
      <ul className="controls">
        <li className="button-control controls-item">
            <CiUser></CiUser>
          <p
            className="btn-manage_user"
            onClick={() => handleTab("user")}
          >
            Manage User
          </p>
        </li>
        <li className="button-control controls-item">
          <p
            type="button"
            className="btn-manage_post"
            onClick={() => handleTab("posts")}
          >
            Manage Post
          </p>
        </li>
        <li className="button-control controls-item">
          <p
            type="button"
            className="btn-statistic"
            onClick={() => handleTab("statistic")}
          >
            Statistic
          </p>
        </li>
      </ul>
      </div> */}

      {/* phần này gắn với button Manage User */}
      {/* {tab === "user" ? (
        <div className="manage__user">
          <div className="table-user"> 
            <div className="search-user">
              <div className="search-btn">
                <button type="button" className="btn-search">
                  Search
                </button>
              </div>
              <div className="search-input">
                <div>
                  <FiSearch className="search-icon"></FiSearch>
                </div>
                <input className="input-text" type="text" size="50"></input>
              </div>
            </div>

            <div className="table-container">
              <table border="5" valign="middle">
                <tr>
                  <th>User Name</th>
                  <th>Full Name</th>
                  <th>Gender</th>
                  <th>Birthday</th>
                  <th>Email</th>
                  <th>ID Card</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                  <th>Other</th>
                </tr>
                {users.map((user) => (
                  <tr>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.gender}</td>
                    <td>{user.birthday}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.card_id}</td>
                    <td>Quang Nam</td>
                    <td>
                      <div className="other-icon">
                        <div>
                          <a href="#">
                            <FiTrash
                              className="remove-table"
                              onClick={() => {
                                handleDeleteUser(user.id);
                              }}
                            ></FiTrash>
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </div>
      ) : tab === "statistic" ? (
        <div className="manage__statistic">
          <div className="title-statistic">
            <h2>Statistic</h2>
            <div className="container-statistic">
              <div className="amount-statistic">
                <table className="table__statistic" border="5" valign="middle">
                  <tr>
                    <th>District</th>
                    <th>Amount</th>
                  </tr>
                  <tr>
                    <td>Thanh Khe</td>
                    <td>3</td>
                  </tr>
                  <tr>
                    <td>Hai Chau</td>
                    <td>2</td>
                  </tr>
                  <tr>
                    <td>Lien Chieu</td>
                    <td>4</td>
                  </tr>
                  <tr>
                    <td>Ngu Hanh Son</td>
                    <td>5</td>
                  </tr>
                  <tr>
                    <td>Son Tra</td>
                    <td>2</td>
                  </tr>
                </table>
              </div>
              <div className="chart-statistic">BIỂU ĐỒ</div>
            </div>
          </div>
        </div>
      ) : tab === "posts" ? (
        <div className="manage__post">
          <div className="title-post">
            <h2>Post List</h2>
                                    
            <div className="table-container">
              <table border="5" valign="middle">
                <tr>
                  <th> Id</th>
                  <th> Name</th>
                  <th>Descripstion</th>
                  <th>Address</th>
                  <th>other</th>
                </tr>
                {addpost.map((post) => (
                  <tr>
                    <td>{post.id}</td>
                    <td>{post.name}</td>
                    <td>{post.description}</td>
                    <td>{post.address}</td>
                    <td>
                      <div className="other-icon">
                        <div>
                          <a href="#">
                            <FiEdit className="edit-table"></FiEdit>
                          </a>
                        </div>

                        <div>
                          <a href="#">
                            <FiTrash
                              className="remove-table"
                              onClick={() => {
                                handleDeletePost(post.id);
                              }}
                            ></FiTrash>
                          </a>
                        </div>
                        <button classname="btn btn-success" onClick={()=>{handleOnClickExport()}}> hehee</button>    
                      </div>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </div>
      ) : (
        <Fragment></Fragment>
      )}
      </div> */}
      <div className="container-dashboard">
  <nav className="nav-dashboard">
    <ul>
      <li>
        <a className="dashboard-link-a" href="#"   onClick={() => handleTab("user")} >
          <i className="fas fa-menorah" />
          <span className="nav-item">Manager User</span>
        </a>
      </li>
      <li>
        <a className="dashboard-link-a" href="#">
          <i className="fas fa-comment" />
          <span className="nav-item"  onClick={() => handleTab("posts")} >Manager Post</span>
        </a>
      </li>
     
    </ul>
  </nav>
  {tab === "user" ? ( <section className="main-dashboard">
    <section className="attendance">
      <div className="attendance-list">
        <form action>
          <input className="dashboard-form-search-input" placeholder="Tìm kiếm user" type="text" />
          <button className="dashboard-form-search-button">Search</button>
        </form>
        <table className="table-dashboard">
          <thead>
            <tr> 
              <th>ID</th>
              <th>User Name</th>
              <th>Full Name</th>
              <th>Gender</th>
              <th>Birthday</th>
              <th>Email</th>
              <th>ID Card</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Other</th>
              <th />
            </tr>
          </thead>
          <tbody>
          {users.map((user) => (
            <tr className="active">
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user?.first_name +" "} {user?.last_name} </td>
              <td>{user.gender}</td>
              <td>{user.birthday}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.card_id}</td>
              <td>Quang Nam</td>
              <td>
                <button  onClick={() => {
                                handleDeleteUser(user.id);
                              }} >Delete</button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </section>
  </section> ) :tab === "posts" ? (<section className="main-dashboard">
    <section className="attendance">
   
      <div className="attendance-list">
        <form action>
          <input className="dashboard-form-search-input" placeholder="Tìm kiếm bài post" type="text" />
          <button className="dashboard-form-search-button">Search</button>
          <button classname="btn btn-success" onClick={()=>{handleOnClickExport()}}> Export File</button>  
        </form>
        <table className="table-dashboard">
          <thead>
            <tr> 
              <th>ID</th>
              <th> Name</th>
              <th>Description</th>
              <th>Address</th>
              <th>Other</th>
             
              <th />
            </tr>
          </thead>
          <tbody>
          {addpost.map((post) => (
            <tr className="active">
              <td>{post.id}</td>
              <td>{post.name}</td>
              <td>{post.description}</td>
              <td>{post.address}</td>
              <td>
                <button  onClick={() => {
                                handleDeletePost(post.id);
                              }} >Delete</button>
              </td>
            </tr>
          ))}
           
          </tbody>
        </table>
      </div>
    </section>
  </section>):(
        <Fragment></Fragment>
      )}
  
</div>

    </div>
  );
};

export default Admin;
