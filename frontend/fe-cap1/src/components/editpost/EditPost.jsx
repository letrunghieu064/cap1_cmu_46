import React, { useRef, useState ,useEffect} from "react";
import { CreatePost } from "../../actions/post";
import { TfiClose } from "react-icons/tfi";
import { CiLocationOn } from "react-icons/ci";
import { useDispatch ,useSelector} from "react-redux";
import userService from "../../services/user.service";
import axios from "axios";

export default function EditPost({ onClose, postItem ,callbackCreateSuccess}) {
  const { user: currentUser } = useSelector((state) => state.auth);
  const inputAddressRef = useRef(null);
  const [data, setData] = useState({
    id:postItem.id,
    description: postItem.description,
    name: postItem.name,
    address: "",
    img_url: postItem.img_url,
    longitude: postItem.longitude,
    latitude: postItem.latitude,
  });
  const [error,setError]=useState(false);
 
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

  const HandleEditPost = async () => {
    console.log("postItem.id", data.id);
    if(data.address.length ===0 || data.description.length === 0 || data.name.length ===0){
      setError(true)
    }
    else{
    const res = await  userService.editPost(data.id,{...data})
     callbackCreateSuccess && callbackCreateSuccess(res);
    console.log("res",res)
    onClose && onClose();
  }
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
          <p className="create--title">Chỉnh sửa  bài viết</p>
          <TfiClose className="create--close" onClick={onClose}></TfiClose>
        </div>
        <div className="create--header__user">
          <img
            class="header__user-img"
            className="new-header_img"
            src={currentUser?.data?.url_img || "https://jp.boxhoidap.com/boxfiles/cach-de-anh-dai-dien-dep--f85ddf18094383e085fb97258c9c8d87.wepb"}
            alt=""
          />
          <p>{currentUser.data.username}</p>
        </div>
        <input type="file"  onChange={handleUploadIamge}  />
        <input
          name="name"
          id="name"
          value={data.name}
          onChange={handleChange}
          placeholder="nhập tên bài post"
        ></input>
         {error&& data.name.length <=0 ?
        <label className="l1 l2">name can not be Empty</label> :" "}
        <div className="create--header-content">
          <textarea
            className="header-content-textarae"
            id="description"
            name="description"
            value={data.description}
            onChange={handleChange}
          ></textarea>
        </div>
        {error&& data.description.length <=0 ?
        <label className="l3">description can not be Empty</label> :" "}
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
           {error&& data.address.length <=0 ?
        <label className="l3">address can not be Empty</label> :" "}
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
          <button className="create__submit-submit" onClick={HandleEditPost}>
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}