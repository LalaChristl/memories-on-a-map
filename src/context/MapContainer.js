import {
  LoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useMemo, useContext, useEffect } from "react";
import { Context } from "./ContextProvider";
import Carousel from "../components/Carousel";

export default function MapContainer() {
  const initialCentering = useMemo(() => ({ lat: 51.1657, lng: 10.4515 }), []);

  const {
    mapProps,
    setMapProps,
    memories,
    setMemories,
    carousel,
    setCarousel,
  } = useContext(Context);

  const props = {
    mapContainerClassName: "map-container",
    zoom: 2.7,
    center: initialCentering,
    options: { streetViewControl: false },
    mapTypeId: "satellite",
  };

  useEffect(() => {
    localStorage.setItem("mapProps", JSON.stringify({ ...props }));
  }, []);

  const handleMapProps = () => {
    const response = localStorage.getItem("mapProps");
    const storageProps = JSON.parse(response);
    setMapProps({ ...storageProps });
  };

  const handleCoordinates = (e) => {
    const newLocation = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setMemories((prevState) => {
      return [...prevState, newLocation];
    });
  };

  const handleFileList = (e) => {
    const id = e.target.id;
    const files = e.target.files;

    function readAndPreview(file) {
      // Regex bellow restrict file extension type match
      if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
        const reader = new FileReader();
        reader.addEventListener(
          "load",
          () => {
            localStorage.setItem(
              String(id).concat(String(reader.result)),
              reader.result
            );

            setCarousel((prevState) => [
              ...prevState,
              { label: "", imgPath: reader.result },
            ]);
          },
          false
        );
        reader.readAsDataURL(file);
      }
    }

    if (files) Array.prototype.forEach.call(files, readAndPreview);
  };

  const handleCarousel = (coordinates, coordinatesID) => {
    let response = localStorage.getItem(coordinatesID);
    console.log("response ->", response);

    // console.log(coordinates);
    // console.log("coordinates", coordinates);
    // console.log("coordinatesID", coordinatesID);
    // return <img className="img" src={response} alt="location" />;
  };

  
  console.log(process.env.REACT_APP_API_KEY)

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
      <GoogleMap
        onLoad={handleMapProps}
        {...mapProps}
        onClick={handleCoordinates}
      >
        {memories.map((obj, idx) => {
          const coordinates = { lat: obj.lat, lng: obj.lng };
          const coordinatesID = String(coordinates.lat).concat(coordinates.lng);
          return (
            <div key={idx}>
              <Marker
                id={coordinatesID}
                position={{ ...coordinates }}
                draggable={true}
                onClick={() => handleCarousel(coordinatesID, coordinates)}
              />

              <InfoWindow
                position={{ ...coordinates }}
                options={{
                  pixelOffset: new window.google.maps.Size(0, -40),
                }}
              >
                <input
                  id={coordinatesID}
                  type="file"
                  multiple={true}
                  onChange={handleFileList}
                  accept="image/*"
                />
              </InfoWindow>
            </div>
          );
        })}

        <div className="carousel-wrapper">
          {carousel.length && <Carousel />}
        </div>
        <div className="logo">MEMORIES ON A MAP</div>
      </GoogleMap>
    </LoadScript>
  );
}
