// import React, { useState } from "react";
// import "mapbox-gl/dist/mapbox-gl.css";
// import ReactMapboxGl, {
//   Marker,
//   NavigationControl,
//   Popup,
//   FullscreenControl,
//   GeolocateControl,
// } from "react-map-gl";
// export default function Mapbox(state) {
//   const [lng, setLng] = useState(107.9380397);
//   const [lat, setLat] = useState(16.0717635);
//   const [showpopup, setshowpopup] = useState(false);
//   const [viewport, setviewport] = useState({
//     lat: 16.0717635,
//     lng: 107.9380397,
//     width: "100vw",
//     height: "100vh",
//     zoom: 10,
//   });
//   return (
//     <div className="App">
//       <ReactMapboxGl
//         {...viewport}
//         mapboxAccessToken="pk.eyJ1IjoiaGlldXRydW5nbGUiLCJhIjoiY2w5dDdtMmpzMDV5dzN1bGcyZXJ3ZHduaSJ9.DRb427bvxQf-pgmEU8AlAw"
//         onViewportChange={(viewport) => {
//           setviewport(viewport);
//         }}
//         style={{
//           width: "1800px",
//           height: "900px",
//           borderRadius: "15px",
//           border: "2px solid red",
//           // marginLeft: "700px",
//         }}
//         // initialViewState={{
//         //   longitude: lng,
//         //   latitude: lat,
//         // }}
//         mapStyle="mapbox://styles/mapbox/streets-v9"
//       >
//         {showpopup && (
//           <Popup
//             latitude={lat}
//             longitude={lng}
//             closeOnClick={false}
//             closeButton={true}
//             onClose={() => setshowpopup(false)}
//             offsetLeft={10}
//           >
//             <div>
//               kinh độ :{108.9380397} vĩ độ :{17.0717635}
//             </div>
//             <div>vụ mất trộm con chó cưng </div>
//           </Popup>
//         )}
//         <Marker longitude={lng} latitude={lat}>
//           <img
//             onClick={() => setshowpopup(true)}
//             style={{ height: 50, width: 50 }}
//             src="https://freesvg.org/img/Map-Warning-Icon.png"
//           />
//         </Marker>

//         <NavigationControl position="bottom-right" />
//         <FullscreenControl />

//         <GeolocateControl />
//       </ReactMapboxGl>
//     </div>
//   );
// }

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
  console.log("addressmarker", addressmarker);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/Project/getpost")
      .then((response) => {
        return response.data;
      })
      .then((result) => {
        setPosts([...result.data]);
      });
  }, []);

  useEffect(() => {
    // eslint-disable-next-line array-callback-return

    // eslint-disable-next-line array-callback-return

    const fecthMap = async () => {
      const newAddress = [];
      const promise = posts.map(async (address) => {
        await axios
          .get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${address.address}550000, Việt Nam.json?access_token=pk.eyJ1IjoiaGlldXRydW5nbGUiLCJhIjoiY2w5dDdtMmpzMDV5dzN1bGcyZXJ3ZHduaSJ9.DRb427bvxQf-pgmEU8AlAw`
          )
          .then((response) => {
            newAddress.push({
              ...address,
              longitude: response.data.features[0].center[0],
              latitude: response.data.features[0].center[1],
            });
          })
          .catch((error) => {
            // handle error
            console.log(error);
          });
      });
      await Promise.all(promise);
      console.log("new", newAddress);
      setaddressmarker(newAddress);
    };
    fecthMap();
  }, [posts]);

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
        {addressmarker.map((park) => (
          <Marker
            key={park.id}
            latitude={park.latitude}
            longitude={park.longitude}
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
              <h2>Địa chỉ : {selectedPark.address}</h2>
              <p>{selectedPark.address}</p>
            </div>
          </Popup>
        ) : null}
        {/* <NavigationControl position="bottom-right" /> */}
      </ReactMapGL>
    </div>
  );
}
