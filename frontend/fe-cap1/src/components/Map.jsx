import React, { useState, useEffect } from "react";
import "./Map/Map.css"
import ReactMapGL, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
// import * as parkDate from "./data/skateboard-parks.json";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";
import Header from "./Header";
import authHeader from "../services/auth-header";
import { ToastContainer, toast } from "react-toastify";
import { FcSpeaker } from "react-icons/fc";
import "react-toastify/dist/ReactToastify.css"; 
import PostItem from "./PostItem";
import { CiChat1 } from "react-icons/ci";
import { CiShare1 } from "react-icons/ci";
import { CiShare2 } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { FaSkull } from "react-icons/fa";
import MapPost from "./mappost/MapPost";
export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 16.0602077,
    longitude: 108.2226407,
    width: "100%",
    height: "100%",
    zoom: 14,
  });

  const [selectedPark, setSelectedPark] = useState(null);
  const [addressmarker, setaddressmarker] = useState([]);
  const [modal, setModal] = useState(false);
  const [createmappost,setCreateMapPost]=useState(false);
  const [posts, setPosts] = useState([]);
  const [post,setPost]=useState(null);
  useEffect(() => {
    toast.promise(
      axios
        .get("http://localhost:3000/api/v1/posts", { headers: authHeader() })
        .then((response) => {
          console.log("res khiem", response.data);
          return response.data;
        })
        .then((result) => {
         
          setPosts([...result]);
          console.log("posts",posts)
        }),
      {
        pending: "Promise is pending",
        success: "Promise  Loaded",
        error: "error",
      }
    );

    // axios
    //   .get("http://localhost:3000/api/v1/posts",{ headers: authHeader() })
    //   .then((response) => {
    //     console.log("res khiem",response.data)
    //     return response.data;
    //   })
    //   .then((result) => {
    //    // toast.success("thanh cong")
    //     setPosts([...result]);
    //   })
  }, []);
  
  const handleCreateModal = () => {
    console.log("modal", modal);
    setModal(!modal);
  };
  const handlePost =()=>{
    setPost(null);
   }


  // useEffect(() => {
  // eslint-disable-next-line array-callback-return

  // eslint-disable-next-line array-callback-return

  //   const fecthMap = async () => {
  //     const newAddress = [];
  //     const promise = posts.map(async (address) => {
  //       await axios
  //         .get(
  //           `https://api.mapbox.com/geocoding/v5/mapbox.places/${address.address}550000, Việt Nam.json?access_token=pk.eyJ1IjoiaGlldXRydW5nbGUiLCJhIjoiY2w5dDdtMmpzMDV5dzN1bGcyZXJ3ZHduaSJ9.DRb427bvxQf-pgmEU8AlAw`
  //         )
  //         .then((response) => {
  //           console.log("typeof", typeof response.data.features[0].center[0]);
  //           newAddress.push({
  //             ...address,
  //             longitude: response.data.features[0].center[0],
  //             latitude: response.data.features[0].center[1],
  //           });
  //         })
  //         .catch((error) => {
  //           // handle error
  //           console.log(error);
  //         });
  //     });
  //     await Promise.all(promise);
  //     console.log("new", newAddress);
  //     setaddressmarker(newAddress);
  //   };
  //   fecthMap();
  // }, [posts]);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);
  // const onclickView = (e) => {};
  return (
    <div>
      <Header></Header>
      <div
        style={{
          height: "920px",
          width: "100%",
          // overflow: "hidden",
          borderRadius: "5px",
          border: "1px solid green",
        }}
      >
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken="pk.eyJ1IjoiaGlldXRydW5nbGUiLCJhIjoiY2w5dDdtMmpzMDV5dzN1bGcyZXJ3ZHduaSJ9.DRb427bvxQf-pgmEU8AlAw"
          mapStyle="mapbox://styles/mapbox/streets-v9"
          onViewportChange={(viewport) => {
            setViewport(viewport);
          }}
        >
          {posts.map((park) => (
            <Marker
              key={park.id}
              latitude={Number(park.latitude)}
              longitude={Number(park.longitude)}
              onClick={handleCreateModal}
            >
              <button
                className="marker-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedPark(park);
                }}
              >
                <img
                  onClick={handleCreateModal}
                  src="https://freesvg.org/img/Map-Warning-Icon.png"
                  alt="https://freesvg.org/img/Map-Warning-Icon.png"
                />
              </button>
            </Marker>
          ))}

          {selectedPark ? (
            <Popup
              latitude={selectedPark.latitude}
              longitude={selectedPark.longitude}
              onClose={() => {
                setSelectedPark(null);
              }}
            >
              <div
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  borderRadius: "1em",
                  padding: "0.2em",
                }}
              >
                <h6>Địa chỉ : {selectedPark?.address}</h6>
                <p>description :{selectedPark?.description}</p>
                <img src={selectedPark.img_url} alt={selectedPark.img_url} />
              </div>
            </Popup>
          ) : null}
          {/* <NavigationControl position="bottom-right" /> */}
        </ReactMapGL>
      </div>
      {/* {!modal && ( */}
        <div
          className="modal"
          style={{
            display: "block",
            height: "920px",
            marginTop:"60px",
            width: "420px",
            left: "auto",
            right: "0px",
            overflowY: "scroll",
            
          }}
        >
          
          {/* <div className="overlays">
          </div>
          */}
          <div className="modal-content">
            <div className="modalwar-content-titer-header">
            <div className="modalwar-content-titer-header-left">
                <h3>News Live</h3>
                <p>Updated on 20/12/2022 22:06:51</p>
              </div>
              <div className="modalwar-content-titer-header-right">
              
              </div>
            </div>
          {posts.map((post,index)=>(
            <div className="modal-content-item">
            <div className="modal-content-map-header">
            <div className="modal-content-map-header-left">
            <FcSpeaker className="modal-content-map-header-left-icon"></FcSpeaker>
              <p>{post?.created_at?.toString().slice(0, 10)}</p>
              </div>
              <div className="modal-content-map-header-right">
            <CiShare1 className="modal-content-map-header-right-icon"></CiShare1>
              <p>Source</p>
              </div>
            </div>
              <div className="modal-content-map-body">
                <p>{post?.description}</p>
                                <img src={post?.img_url || ""} alt="" />

              </div>
              <div className="modal-content-map-footer">
            <div className="modal-content-map-footer-left">
            <CiChat1 className="modal-content-map-footer-left-icon"></CiChat1>
              <p onClick={()=>{setPost(post)}}>Comments</p>
              </div>
              <div className="modal-content-map-footer-right">
              <p>Tell friends</p>
            <CiShare2 className="modal-content-map-footer-right-icon"></CiShare2>
              
              </div>
            </div>
            </div>
          ))}
            <div className="modal-content-item">
            <div className="modal-content-map-header">
            <div className="modal-content-map-header-left">
            <FcSpeaker className="modal-content-map-header-left-icon"></FcSpeaker>
              <p>5 hour</p>
              </div>
              <div className="modal-content-map-header-right">
            <CiShare1 className="modal-content-map-header-right-icon"></CiShare1>
              <p>Source</p>
              </div>
            </div>
              <div className="modal-content-map-body">
                <p>German Chancellor Olaf Scholz: "Our goal is for Russia to end its war and preserve Ukraine's integrity." "This will require talks." "Whether it will be by phone, video call, or at a long table will reveal itself." - SZ -</p>
                <img src="data:image/jpeg;base64,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" alt="" />
              </div>
              <div className="modal-content-map-footer">
            <div className="modal-content-map-footer-left">
            <CiChat1 className="modal-content-map-footer-left-icon"></CiChat1>
              <p onClick={()=>{setCreateMapPost(!modal)}}>Comments</p>
              </div>
              <div className="modal-content-map-footer-right">
              <p>Tell friends</p>
            <CiShare2 className="modal-content-map-footer-right-icon"></CiShare2>
              
              </div>
            </div>
            </div>
          </div>
          
          </div>
          {/* <div className="modal" style={{
            display: "block",
            height: "920px",
            marginTop:"60px",
            marginRight:"499px",
            width: "420px",
            left: "auto",
            right: "0px",
            // overflowY: "scroll",
            
          }}>
              <div className="overplay modal-content-comment">
                <div className="modal-content-comment-header">
                    <div className="modal-content-comment-header-left">
                    <CiShare1 className="modal-content-comment-header-icon"></CiShare1>
                    <p>Source</p>
                    </div>
                    <div className="modal-content-comment-header-right">
                    <CiLocationOn className="modal-content-comment-header-icon"> </CiLocationOn>
                      <p>On live map</p>
                    </div>
                    
                </div>
                <div className="modal-content-comment-content"> 
                <div className="modal-content-comment-content-title"> 
                  <FaSkull className="modal-content-comment-content-title-icon"></FaSkull>
                  <p>25 minutes ago - </p>
                  <h2> 55°35′N 46°51′E</h2>
                </div>
                <div className="modal-content-comment-content-body">
                    <p>
                    Three people were killedne was injured in an explosion on the Urengoy-Pomary-Uzhgorod gas pipeline in Chuvashia
                    </p>
                    <button>Show Comment</button>
                </div>
                <div className="modal-content-comment-content-comment">
                <div className="modal-content-comment-content-comment-body">
                    <div className="modal-content-comment-content-comment-write">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiGxpPkOa9f5LzIgUoOswNCmnIA_DwaufG-A&usqp=CAU" />
                      <textarea placeholder="Join the discussion..."></textarea>
                      <button>Comment</button>
                    </div>
                    <div className="modal-content-comment-content-comment-read">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiGxpPkOa9f5LzIgUoOswNCmnIA_DwaufG-A&usqp=CAU" />
                    <div className="modal-content-comment-content-comment-read-letter">
                      <p className="comment-content-comment-read-letter-name">Hieu Lee</p>
                      <p className="comment-content-comment-read-letter-time">11 minutes ago</p>
                      <p className="comment-content-comment-read-letter-writed"> Hôm qua mới nhậu ở đây luôn, sợ quá</p>
                    </div>
                    </div>
                    <div className="modal-content-comment-content-comment-read">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiGxpPkOa9f5LzIgUoOswNCmnIA_DwaufG-A&usqp=CAU" />
                    <div className="modal-content-comment-content-comment-read-letter">
                      <p className="comment-content-comment-read-letter-name">Hieu Lee</p>
                      <p className="comment-content-comment-read-letter-time">11 minutes ago</p>
                      <p className="comment-content-comment-read-letter-writed"> Hôm qua mới nhậu ở đây luôn, sợ quá</p>
                    </div>
                    </div>
                    <div className="modal-content-comment-content-comment-read">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiGxpPkOa9f5LzIgUoOswNCmnIA_DwaufG-A&usqp=CAU" />
                    <div className="modal-content-comment-content-comment-read-letter">
                      <p className="comment-content-comment-read-letter-name">Hieu Lee</p>
                      <p className="comment-content-comment-read-letter-time">11 minutes ago</p>
                      <p className="comment-content-comment-read-letter-writed"> Hôm qua mới nhậu ở đây luôn, sợ quá</p>
                    </div>
                    </div>
                </div>
                </div>
                </div>
              </div>
        </div> */}
        {post && (<MapPost  post={post} onClose={handlePost}></MapPost>)}
        
         
      {/* )} */}
    </div>
  );
}
