import React, { useRef, useState } from "react";
import { CreatePost } from "../../actions/post";
import { TfiClose } from "react-icons/tfi";
import { CiLocationOn } from "react-icons/ci";
import { useDispatch ,useSelector} from "react-redux";

import axios from "axios";

export default function PostCreate({ onClose, callbackCreateSuccess }) {
  const { user: currentUser } = useSelector((state) => state.auth);
  const inputAddressRef = useRef(null);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    description: "",
    name: "",
    address: "",
    img_url: "",
    longitude: 0,
    latitude: 0,
  });
  console.log("dât khiemn", data)
  const [listAddr, setListAddr] = useState([]);
  console.log("listAddr", listAddr);
  const handleChange = (e) => {
    console.log("test", e.target.value);
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleUploadIamge = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        setData({
          ...data,
          img_url: reader.result,
        });
      };
    }
  };

  const handleChangeAddress = async (e) => {
    // debounce
    const addr = e.target.value;
    if (addr) {
      const add = await axios.get(
        `https://maps.google.com/maps/api/geocode/json?address=${addr}&key=${process.env.REACT_APP_MAP_API_KEY}`
      );

      if (add && add.data && add.data.results) setListAddr(add.data.results);
    } else {
      setListAddr([]);
    }
  };

  const HandleCreatePost = async () => {
    console.log("data", data);
    const res = await  dispatch(CreatePost({ ...data }));
    callbackCreateSuccess && callbackCreateSuccess(res);
    onClose && onClose();
  
  };

  const handleChooseAddress = async (item) => {
    setData({
      ...data,
      address: item.formatted_address,
      longitude: item.geometry?.location?.lng,
      latitude: item.geometry?.location?.lat,
    });
    setListAddr([]);
    //document.getElementById("address").value = item.formatted_address;
    inputAddressRef.current.value = item.formatted_address;
  };

  return (
    <div id="create_modal" className="open create_modal">
      <div onClick={onClose} className="modal-overplay"></div>
      <div className="modal--body">
        <div className="create--header">
          <p className="create--title">Tạo bài viết</p>
          <TfiClose className="create--close" onClick={onClose}></TfiClose>
        </div>
        <div className="create--header__user">
          <img
            class="header__user-img"
            className="new-header_img"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiquxzRvxiQGtrn3rlBgGKAWixXBIhPWhOOw&usqp=CAU"
            alt=""
          />
          <p>{currentUser.data.username}</p>
        </div>
        <input type="file" onChange={handleUploadIamge} />
        <input
          name="name"
          id="name"
          onChange={handleChange}
          placeholder="nhập tên bài post"
        ></input>
        <div className="create--header-content">
          <textarea
            className="header-content-textarae"
            id="description"
            name="description"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="create__content">
          <input
            placeholder="Nhập địa chỉ ( số và tên đường , quận, thành phố)"
            type="text"
            id="address"
            ref={inputAddressRef}
            name="address"
            className="create__content-input"
            onChange={handleChangeAddress}
          />
        </div>
        <ul>
          {listAddr &&
            listAddr.length > 0 &&
            listAddr.map((item) => {
              return (
                <li onClick={() => handleChooseAddress(item)}>
                  {item.formatted_address}
                </li>
              );
            })}
        </ul>
        <div className="create__choose">
          <p>Thêm vào bài viết </p>
          <CiLocationOn className="create__choose-location"></CiLocationOn>
        </div>
        <div className="create__submit">
          <button className="create__submit-submit" onClick={HandleCreatePost}>
            Đăng
          </button>
        </div>
      </div>
    </div>
  );
}