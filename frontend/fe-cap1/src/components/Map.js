import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
// import * as parkDate from "./data/skateboard-parks.json";
import axios from "axios";

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 16.0602077,
    longitude: 108.2226407,
    width: "100vw",
    height: "100vh",
    zoom: 12,
  });

  const [selectedPark, setSelectedPark] = useState(null);
  const [addressmarker, setaddressmarker] = useState([]);
  console.log("addressmarker", addressmarker);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line array-callback-return

    // eslint-disable-next-line array-callback-return

    const fecthMap = async () => {
      const newAddress = [];
      const promise = await posts.map(async (address) => {
        await axios
          .get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${address.address}.json?access_token=pk.eyJ1IjoiaGlldXRydW5nbGUiLCJhIjoiY2w5dDdtMmpzMDV5dzN1bGcyZXJ3ZHduaSJ9.DRb427bvxQf-pgmEU8AlAw`
          )
          .then(function (response) {
            newAddress.push({
              ...address,
              longitude: response.data.features[0].center[0],
              latitude: response.data.features[0].center[1],
            });
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      });
      await Promise.all(promise);
      console.log("nmew", newAddress);
      setaddressmarker(newAddress);
    };
    fecthMap();
  }, [posts]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/Project/getpost")
      .then((response) => {
        return response.data;
      })
      .then((result) => {
        setPosts([...result.data]);
      });
  }, []);

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
        //   marginTop: "50px",
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
      </ReactMapGL>
    </div>
  );
}
