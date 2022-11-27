import React, { useState, useEffect, Fragment } from "react";
import "./Admin.css";
import { FiEdit, FiSearch, FiTrash } from "react-icons/fi";
import userService from "../services/user.service";
import Header from "./Header";
import axios from "axios";

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
    axios
      .get("http://localhost:5000/api/Project/getpost")
      .then((response) => {
        return response.data;
      })
      .then((result) => {
        const postlist = [...result.data];
        setaddpost(postlist);
        console.log(postlist);
      });
  }, []);
  const onDelete = (id) => {
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
      onDelete(id);
    }
  };
  return (
    <div>
      <Header></Header>
      <div className="controls">
        <div className="button-control">
          <button
            type="button"
            className="btn-manage_user"
            onClick={() => handleTab("user")}
          >
            Manage User
          </button>
        </div>
        <div className="button-control">
          <button
            type="button"
            className="btn-manage_post"
            onClick={() => handleTab("posts")}
          >
            Manage Post
          </button>
        </div>
        <div className="button-control">
          <button
            type="button"
            className="btn-statistic"
            onClick={() => handleTab("statistic")}
          >
            Statistic
          </button>
        </div>
      </div>

      {/* phần này gắn với button Manage User */}
      {tab === "user" ? (
        <div className="manage__user">
          <div className="title-list">
            <h2>User List</h2>
          </div>

          <div>
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
                </tr>
                {addpost.map((post) => (
                  <tr>
                    <td>{post.id}</td>
                    <td>{post.name}</td>
                    <td>{post.descripstion}</td>
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
                                handleDeleteUser(post.id);
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
      ) : (
        <Fragment></Fragment>
      )}

      {/* phần này gắn với button Manage Post, hiếu bỏ bài post vào ha
      <div className="manage__post">
        <div className="title-post">
          <h2>Post List</h2>
        </div>
      </div> */}

      {/* phần này gắn với button Statistic */}
    </div>
  );
};

export default Admin;
