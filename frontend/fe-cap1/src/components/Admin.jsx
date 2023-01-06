import React, { useState, useEffect, Fragment } from "react";
import "./Admin.css";
import { FiEdit, FiSearch, FiTrash } from "react-icons/fi";
import userService from "../services/user.service";
import Header from "./Header";
import axios from "axios";
import authHeader from "../services/auth-header";
import Exportexcel from "../util/constants/Exportexcel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CiUser } from "react-icons/ci";
import { BiUserCircle } from "react-icons/bi";
import { BiColumns } from "react-icons/bi";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const Admin = () => {
  const [tab, setTab] = useState("user");
  const [inputsearch, setInputSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [addpost, setaddpost] = useState([]);
  const [checkreset, setCheckReset] = useState(false);
  const [show, setShow] = useState(false);
  const [idpost,setIdPost]= useState(-1);
  const [iduser,setIdUser]= useState(-1);
  const handleClose = () => setShow(false);
  const handleShow = (id) =>{
    setShow(true) 
    if(tab === "posts"){
    setIdPost(id)}
    else{
      setIdUser(id)
    }
   } 

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
  }, [checkreset]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios
        .get("http://localhost:3000/api/v1/posts", { headers: authHeader() })
        .then((response) => {
          return response.data;
        })
        .then((result) => {
          // console.log("data",result);
          // const postlist = [...result];
          // setaddpost(postlist);
          return result;
        });
      console.log("data", result);
      const postlist = [...result];
      setaddpost(postlist);
    };
    fetchData();
  }, [checkreset]);
  const onDeleteUser = (id) => {
    const user = users.filter((item) => item.id !== id);
    setUsers(user);
  };
  const handleDeleteUser = async () => {
    const response = await userService.deleteUser(iduser);

    console.log("response", response);
    if (response !== 200) {
      toast.error("Delete not Success!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (response === 200) {
      toast.success("Delete Success", {
        position: toast.POSITION.TOP_RIGHT,
      });
      onDeleteUser(iduser);
      setShow(!show)
    }
  };
  const onDeletePost = (idpost) => {
    const post = addpost.filter((item) => item.id !== idpost);
    setaddpost(post);
    
  };
  const handleDeletePost = async () => {
    const response = await userService.deleteAdminPost(idpost);

    console.log("response", response);
    if (response !== 200) {
      toast.error("Delete not Success!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (response === 200) {
    
      toast.success("Delete Success", {
        position: toast.POSITION.TOP_RIGHT,
      });
      onDeletePost(idpost);
      setShow(!show)
    }
  };
  let handleOnClickExport = async () => {
    console.log("sầ", addpost);
    if (addpost) {
      toast.success("Export File Cuscess!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      await Exportexcel.exportExcel(addpost, "danh sách post", "list");
    }
  };
  const handleChange = async (e) => {
    setInputSearch(e.target.value);
    console.log("ess", inputsearch.length);
  };
  const SearchPost = async (e) => {
    e.preventDefault();
    console.log("input", inputsearch);
    const response = await userService.searchPost(inputsearch);
    setaddpost(response);
  };
  const SearchUser = async (e) => {
    e.preventDefault();
    console.log("input", inputsearch);
    const response = await userService.searchUser(inputsearch);
    setUsers(response);
  };
  const handleAccuracy =async(id,status)=>{
    
    const response = await userService.comFirm(id,status);
    // setaddpost(response);
    if(response.statusCode === 200){
      console.log("id", response);
      setaddpost(response.data);
    }
  }
  return (
    <div>
      <Header></Header>
      <div className="container-dashboard">
        <nav className="nav-dashboard">
          <ul>
            <li>
              <a
                className="dashboard-link-a"
                href="#"
                onClick={() => handleTab("user")}
              >
                <BiUserCircle className="dashboard-link-a-icon"></BiUserCircle>
                <p className="nav-item">Manager User</p>
              </a>
            </li>
            <li>
              <a className="dashboard-link-a" href="#">
                <BiColumns className="dashboard-link-a-icon"></BiColumns>
                <p className="nav-item" onClick={() => handleTab("posts")}>
                  Manager Post
                </p>
              </a>
            </li>
          </ul>
        </nav>
        {tab === "user" ? (
          <section className="main-dashboard">
            <section className="attendance">
              <div className="attendance-list">
                <form action>
                  <input
                    className="dashboard-form-search-input"
                    placeholder="Searching for user"
                    type="text"
                    value={inputsearch}
                    onChange={handleChange}
                  />
                  <button
                    className="dashboard-form-search-button"
                    onClick={SearchUser}
                  >
                    Search
                  </button>
                  <button
                    className="reset-adminn"
                    onClick={() => {
                      setCheckReset(!checkreset);
                    }}
                  >
                    {" "}
                    Reset
                  </button>
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
                        <td>{user?.id}</td>
                        <td>{user?.username}</td>
                        <td>
                          {user?.first_name + " "} {user?.last_name}{" "}
                        </td>
                        <td>{user?.gender}</td>
                        <td>{user?.birthday}</td>
                        <td>{user?.email}</td>
                        <td>{user?.card_id}</td>
                        <td>{user?.phone_number}</td>
                        <td>{user?.address}</td>
                        <td>
                          <button
                            onClick={() => {
                              handleShow(user?.id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </section>
        ) : tab === "posts" ? (
          <section className="main-dashboard">
            <section className="attendance">
              <div className="attendance-list">
                <form action>
                  <input
                    className="dashboard-form-search-input"
                    placeholder="Searching for post"
                    type="text"
                    value={inputsearch}
                    onChange={handleChange}
                  />
                  <button
                    className="dashboard-form-search-button"
                    onClick={SearchPost}
                  >
                    Search
                  </button>
                  
                  <button
                    className="reset-adminn"
                    onClick={() => {
                      setCheckReset(!checkreset);
                    }}
                  >
                    {" "}
                    Reset
                  </button>
                  <button
                    className="reset-adminn btn-export-file"
                    onClick={() => {
                      handleOnClickExport();
                    }}
                  >
                    {" "}
                    Export File
                  </button>
                </form>
                <table className="table-dashboard">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th> Name</th>
                      <th>Status</th>
                      <th>Description</th>
                      <th>Address</th>
                      <th>accuracy </th>
                      <th>Other</th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {addpost.map((post) => (
                      <tr className="active active-verifyy">
                        <td>{post?.id}</td>
                        <td>{post?.name}</td>
                        <td>
                          {" "}
                          {post?.status === "verified"? (
                            <p style={{ color: "green" }}>Verified </p>
                          ) : (
                            <p style={{ color: "red" }}>Not Verified </p>
                          )}
                        </td>
                        <td>{post?.description}</td>
                        <td>{post?.address}</td>
                        <td>
                          {" "}
                          {post?.status === "verified"? (
                            <button className="button-xacthuc button-redo"
                    
                              onClick={() => {
                                handleAccuracy(post?.id,0);
                              }}
                            >
                              Redo
                            </button>
                          ) : (
                            <button className=" button-redo"
                              onClick={() => {
                                handleAccuracy(post.id,1);
                              }}
                            >
                              Verified
                            </button>
                          )}
                        </td>
                        <td>
                          <button
                            onClick={ () => {
                              handleShow(post?.id)
                              // handleDeletePost(post?.id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </section>
        ) : (
          <Fragment></Fragment>
        )}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        {tab ==="posts" ? ( <Modal.Title>Are you want to delete this post??</Modal.Title> ):( <Modal.Title>Are you want to delete this user??</Modal.Title>)}
        </Modal.Header>
        {tab ==="posts" ? (<Modal.Body>Are you sure to delete this post?</Modal.Body>):(<Modal.Body>Are you sure to delete this user?</Modal.Body>)} 
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {tab ==="posts" ?(<Button variant="primary" onClick={   handleDeletePost }>
            Save Changes
          </Button>) :(<Button variant="primary" onClick={   handleDeleteUser }>
            Save Changes
          </Button>)}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Admin;
