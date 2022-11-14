import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

import { useMemo, useContext, useEffect } from "react";
import { Context } from "./ContextProvider";

export function MapContainer() {
  const { mapState, setMapState } = useContext(Context);

  useEffect(() => {
    console.log("useEffect MapContainer -> mapState: ", mapState);
  }, [mapState]);

  const onInfoWindowClose = () => {};
  const onMarkerClick = () => {};
  const mapSettings = {
    style: {
      borderRadius: "15px",
      width: "100vw",
      height: "100vh",
    },
    mapTypeControl: true,
    initialCenter: { lat: "51.1657", lng: "10.4515" },
    fullscreenControl: true,
    scaleControl: true,
    streetViewControl: false,
    zoom: 2.4,
    minZoom: 0,
    maxZoom: 10,
    zoomControl: false,
    gestureHandling: "greedy",
    disableDoubleClickZoom: false,
    clickableIcons: false,
  };

  return (
    <Map
    // className="map"
    // google={window.google}
    // {...mapSettings}
    // onLoad={!mapState ? setMapState(window.google.maps) : null}
    // onClick={(mapProps, map, clickEvent) => {
    //   // console.log(mapProps, map, clickEvent);
    //   console.log("jj", mapState);
    // }}
    >
      {/* <Marker
        onClick={onMarkerClick}
        name={"Current location"}
        position={{ lat: 51.1657, lng: 10.4515 }}
      /> */}
      {/* <InfoWindow
        onClose={onInfoWindowClose}
        name={"Current location"}
        position={{ lat: 51.1657, lng: 10.4515 }}
      > */}
      <div>{/* <h1>{state2.selectedPlace.name}</h1> */}</div>
      {/* </InfoWindow> */}
    </Map>
  );
}

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyBs2dxYcq7GG0cp3HaB-SJAEOZMrSxI0jc",
// })(MapContainer);

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyBs2dxYcq7GG0cp3HaB-SJAEOZMrSxI0jc",
// })(MapContainer);

// in new npm pack
// const apiKey = new LoadScript({
//   googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
// });
