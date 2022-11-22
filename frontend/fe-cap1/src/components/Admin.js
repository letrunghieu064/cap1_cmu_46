import React, { useState } from "react";
import "./Admin.css";
import { FiEdit, FiSearch, FiTrash } from "react-icons/fi";
import Header from "./Header";

const Admin = () => {
  const [manageuser, setManageUser] = useState(false);
  const [statistic, setStatistic] = useState(false);
  const handleManageUser = () => {
    setManageUser(!manageuser);
  };
  const handleStatistic = () => {
    setStatistic(!statistic);
  };
  return (
    <div>
      <Header></Header>
      <div className="controls">
        <div className="button-control">
          <button
            type="button"
            className="btn-manage_user"
            onClick={handleManageUser}
          >
            Manage User
          </button>
        </div>
        <div className="button-control">
          <button type="button" className="btn-manage_post">
            Manage Post
          </button>
        </div>
        <div className="button-control">
          <button
            type="button"
            className="btn-statistic"
            onClick={handleStatistic}
          >
            Statistic
          </button>
        </div>
      </div>

      {/* phần này gắn với button Manage User */}
      {manageuser && !statistic && (
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
                <tr>
                  <td>nganle263</td>
                  <td>Le Kim Ngan</td>
                  <td>Nu</td>
                  <td>26/03/2002</td>
                  <td>kimngann2603@gmail.com</td>
                  <td>123456789</td>
                  <td>111111111</td>
                  <td>Quang Nam</td>
                  <td>
                    <div className="other-icon">
                      <div>
                        <a href="#">
                          <FiEdit className="edit-table"></FiEdit>
                        </a>
                      </div>

                      <div>
                        <a href="#">
                          <FiTrash className="remove-table"></FiTrash>
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>nganle263</td>
                  <td>Le Kim Ngan</td>
                  <td>Nu</td>
                  <td>26/03/2002</td>
                  <td>kimngann2603@gmail.com</td>
                  <td>123456789</td>
                  <td>111111111</td>
                  <td>Quang Nam</td>
                  <td>
                    <div className="other-icon">
                      <div>
                        <a href="#">
                          <FiEdit className="edit-table"></FiEdit>
                        </a>
                      </div>

                      <div>
                        <a href="#">
                          <FiTrash className="remove-table"></FiTrash>
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>nganle263</td>
                  <td>Le Kim Ngan</td>
                  <td>Nu</td>
                  <td>26/03/2002</td>
                  <td>kimngann2603@gmail.com</td>
                  <td>123456789</td>
                  <td>111111111</td>
                  <td>Quang Nam</td>
                  <td>
                    <div className="other-icon">
                      <div>
                        <a href="#">
                          <FiEdit className="edit-table"></FiEdit>
                        </a>
                      </div>

                      <div>
                        <a href="#">
                          <FiTrash className="remove-table"></FiTrash>
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>nganle263</td>
                  <td>Le Kim Ngan</td>
                  <td>Nu</td>
                  <td>26/03/2002</td>
                  <td>kimngann2603@gmail.com</td>
                  <td>123456789</td>
                  <td>111111111</td>
                  <td>Quang Nam</td>
                  <td>
                    <div className="other-icon">
                      <div>
                        <a href="#">
                          <FiEdit className="edit-table"></FiEdit>
                        </a>
                      </div>

                      <div>
                        <a href="#">
                          <FiTrash className="remove-table"></FiTrash>
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>nganle263</td>
                  <td>Le Kim Ngan</td>
                  <td>Nu</td>
                  <td>26/03/2002</td>
                  <td>kimngann2603@gmail.com</td>
                  <td>123456789</td>
                  <td>111111111</td>
                  <td>Quang Nam</td>
                  <td>
                    <div className="other-icon">
                      <div>
                        <a href="#">
                          <FiEdit className="edit-table"></FiEdit>
                        </a>
                      </div>

                      <div>
                        <a href="#">
                          <FiTrash className="remove-table"></FiTrash>
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* phần này gắn với button Manage Post, hiếu bỏ bài post vào ha
      <div className="manage__post">
        <div className="title-post">
          <h2>Post List</h2>
        </div>
      </div> */}

      {/* phần này gắn với button Statistic */}
      {statistic && !manageuser && (
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
      )}
    </div>
  );
};

export default Admin;
