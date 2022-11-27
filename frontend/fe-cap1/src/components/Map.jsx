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
export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 16.0602077,
    longitude: 108.2226407,
    width: "100vw",
    height: "100vh",
    zoom: 13,
  });

  const [selectedPark, setSelectedPark] = useState(null);
  const [addressmarker, setaddressmarker] = useState([]);

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/posts",{ headers: authHeader() })
      .then((response) => {
        return response.data;
      })
      .then((result) => {
        console.log("ressult",result)
        setPosts([...result]);
      });
  }, []);

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
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoiaGlldXRydW5nbGUiLCJhIjoiY2w5dDdtMmpzMDV5dzN1bGcyZXJ3ZHduaSJ9.DRb427bvxQf-pgmEU8AlAw"
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
        // style={{
        //   height: "300px",
        //   width: "600px",

        //   borderRadius: "15px",
        //   border: "2px solid red",
        // }}
      >
        {posts.map((park) => (
          <Marker
            key={park.id}
            latitude={Number(park.latitude)}
            longitude={Number(park.longitude)}
          >
            <button
              className="marker-btn"
              onClick={(e) => {
                e.preventDefault();
                setSelectedPark(park);
              }}
            >
              <img
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
                backgroundColor: "green",
                color: "white",
                borderRadius: "1em",
                padding: "0.2em",
              }}
            >
              <h6>Địa chỉ : {selectedPark.address}</h6>
              <p>{selectedPark.name}</p>
              <img
                src={selectedPark.img_url}
                alt={selectedPark.img_url}
              />
            </div>
          </Popup>
        ) : null}
        {/* <NavigationControl position="bottom-right" /> */}
      </ReactMapGL>
    </div>
  );
}
