import React, { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapboxGl, {
  Marker,
  NavigationControl,
  Popup,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
export default function Mapbox(state) {
  const [lng, setLng] = useState(107.9380397);
  const [lat, setLat] = useState(16.0717635);
  const [showpopup, setshowpopup] = useState(false);
  const [viewport, setviewport] = useState({
    lat: 16.0717635,
    lng: 107.9380397,
    width: "100vw",
    height: "100vh",
    zoom: 10,
  });
  return (
    <div className="App">
      <ReactMapboxGl
        {...viewport}
        mapboxAccessToken="pk.eyJ1IjoiaGlldXRydW5nbGUiLCJhIjoiY2w5dDdtMmpzMDV5dzN1bGcyZXJ3ZHduaSJ9.DRb427bvxQf-pgmEU8AlAw"
        onViewportChange={(viewport) => {
          setviewport(viewport);
        }}
        style={{
          width: "1800px",
          height: "900px",
          borderRadius: "15px",
          border: "2px solid red",
          // marginLeft: "700px",
        }}
        // initialViewState={{
        //   longitude: lng,
        //   latitude: lat,
        // }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        {showpopup && (
          <Popup
            latitude={lat}
            longitude={lng}
            closeOnClick={false}
            closeButton={true}
            onClose={() => setshowpopup(false)}
            offsetLeft={10}
          >
            <div>
              kinh độ :{108.9380397} vĩ độ :{17.0717635}
            </div>
            <div>vụ mất trộm con chó cưng </div>
          </Popup>
        )}
        <Marker longitude={lng} latitude={lat}>
          <img
            onClick={() => setshowpopup(true)}
            style={{ height: 50, width: 50 }}
            src="https://freesvg.org/img/Map-Warning-Icon.png"
          />
        </Marker>

        <NavigationControl position="bottom-right" />
        <FullscreenControl />

        <GeolocateControl />
      </ReactMapboxGl>
    </div>
  );
}
