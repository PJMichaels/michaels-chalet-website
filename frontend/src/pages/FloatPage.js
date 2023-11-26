import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import getRiverData from '../funcs/getRiverData';

const dataStreamsURL = "https://labs.waterdata.usgs.gov/sta/v1.1/Things('USGS-01064500')/Datastreams";

// const riverLatitude = 44.040561;
// const riverLongitude = -71.132496;
// const points = [
//   {id: 0, name: "test", latitude: 44.040561, longitude: -71.132496}
// ];


// const data = getRiverData().toString();
// const [riverSpeed, setRiverSpeed] = useState([]);

  // this code actually populates variables

// const getWaterDataStreamInfoWithAxios = async () => {
//   const response = await axios.get(dataStreamAPI);
//   setRiverData(response.data);


const FloatPage = () => {

  const [dataStreams, setDataStreams] = useState({});


  const getWaterDataStreamInfoWithAxios = () => {
    const observationLinks = axios.get(dataStreamsURL).then(
      (response) => {
        return response.data.value.map(
          (item) => [item["description"].split("/")[0], axios.get(item["Observations@iot.navigationLink"]).then((response) => {return response.data;})]);
      }
    )

    return observationLinks;
  };


  useEffect(() => {
    const fetchData = async() => { 
    const result = await getWaterDataStreamInfoWithAxios();
    setDataStreams(result);
    };

    fetchData();
  }, []);


  return (
    <div>
      <h1>Hello, this is the Saco River Page!</h1>
      <p>
        Place holder for where we can record river float trip
        details, entry and exit points, river speed vs float time,
        recommended gear, etc..
      </p>
      <p>
        {JSON.stringify(dataStreams)}
      </p>
    </div>
  );
};

export default FloatPage;