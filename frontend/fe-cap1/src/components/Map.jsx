import React, { useState, useEffect } from "react";
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
import "react-toastify/dist/ReactToastify.css";
import PostItem from "./PostItem";
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

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    toast.promise(
      axios
        .get("http://localhost:3000/api/v1/posts", { headers: authHeader() })
        .then((response) => {
          console.log("res khiem", response.data);
          return response.data;
        })
        .then((result) => {
          //
          setPosts([...result]);
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
          overflow: "hidden",
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
          <div className="overplay"></div>
          <div className="modal-content">
            <h2>sahfjshdfjsdhfh</h2>
            <p>
              Basic Information Member Since: March 2022 Business Type:
              Exporter/Importer Location: UNITED ARAB EMIRATES Joined Categories
              Adhesives and Sealants Alcoholic Drinks Animal Feed
              Animal/Vegetable Fats and Oils Barley Basmati Rice Beans and
              Pulses Beverages Canola Oil Carbon Black Carpets and Textile Floor
              Coverings Cereals Coconut Oil Coffee and Tea Corn Oil Cotton
              Designer Jewellery Detergents Drinking Water Dyes and Pigments
              Basic Information Member Since: March 2022 Business Type:
              Basic Information Member Since: March 2022 Business Type:
              Exporter/Importer Location: UNITED ARAB EMIRATES Joined Categories
              Adhesives and Sealants Alcoholic Drinks Animal Feed
              Animal/Vegetable Fats and Oils Barley Basmati Rice Beans and
              Pulses Beverages Canola Oil Carbon Black Carpets and Textile Floor
              Coverings Cereals Coconut Oil Coffee and Tea Corn Oil Cotton
              Designer Jewellery Detergents Drinking Water Dyes and Pigments
              Basic Information Member Since: March 2022 Business Type:
              Basic Information Member Since: March 2022 Business Type:
              Exporter/Importer Location: UNITED ARAB EMIRATES Joined Categories
              Adhesives and Sealants Alcoholic Drinks Animal Feed
              Animal/Vegetable Fats and Oils Barley Basmati Rice Beans and
              Pulses Beverages Canola Oil Carbon Black Carpets and Textile Floor
              Coverings Cereals Coconut Oil Coffee and Tea Corn Oil Cotton
              Designer Jewellery Detergents Drinking Water Dyes and Pigments
              Basic Information Member Since: March 2022 Business Type:
              Basic Information Member Since: March 2022 Business Type:
              Exporter/Importer Location: UNITED ARAB EMIRATES Joined Categories
              Adhesives and Sealants Alcoholic Drinks Animal Feed
              Animal/Vegetable Fats and Oils Barley Basmati Rice Beans and
              Pulses Beverages Canola Oil Carbon Black Carpets and Textile Floor
              Coverings Cereals Coconut Oil Coffee and Tea Corn Oil Cotton
              Designer Jewellery Detergents Drinking Water Dyes and Pigments
              Basic Information Member Since: March 2022 Business Type:
              Basic Information Member Since: March 2022 Business Type:
              Exporter/Importer Location: UNITED ARAB EMIRATES Joined Categories
              Adhesives and Sealants Alcoholic Drinks Animal Feed
              Animal/Vegetable Fats and Oils Barley Basmati Rice Beans and
              Pulses Beverages Canola Oil Carbon Black Carpets and Textile Floor
              Coverings Cereals Coconut Oil Coffee and Tea Corn Oil Cotton
              Designer Jewellery Detergents Drinking Water Dyes and Pigments
              Basic Information Member Since: March 2022 Business Type:
              
             <div data-link="https://liveuamap.com/en/2022/16-december-pmc-wagner-mercenaries-captured-yakovlivka-village" data-twitpic data-id={22520545} id="post-22520545" className="event cat1 sourcees selected">
                <div className="time top-info">
                    <img src="https://liveuamap.com/en/2022/16-december-pmc-wagner-mercenaries-captured-yakovlivka-village" />
                    <span className="date_add">15 hours ago</span>
                          <div className="top-right">
                              <a rel="nofollow noopener" className="source-link" href="https://t.me/yaremshooter/572" target="_blank">
                              <span className="source" />source</a>
                          </div>
                        </div>
                      <div className="title">PMC Wagner mercenaries captured Yakovlivka village east to Bakhmut</div>
                    <div className="img "><label><img src="https://liveuamap.com/pics/2022/12/16/22520545_0.jpg" />
                    </label>
                  </div>
                  <div className="bottom-info" title>
                  <div className="top-left">
                  <a href="https://liveuamap.com/en/2022/16-december-pmc-wagner-mercenaries-captured-yakovlivka-village" data-id={22520545} className="comment-link">Comments</a>
                  </div>
                  <div className="top-bright">
                  <label>Tell friends</label>
                  <a data-id={22520545} className="facebook-icon fb" href="#" />
                  <a data-id={22520545} className="twitter-icon twi" href="#" />
                  
                  </div>
                  </div>
                  </div>

            </p>
            <PostItem></PostItem>
          </div>
        </div>
      {/* )} */}
    </div>
  );
}
