import React, { useState, useEffect } from 'react';
import getRiverData from '../utilities/getRiverData';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


// const riverLatitude = 44.040561;
// const riverLongitude = -71.132496;
// const points = [
//   {id: 0, name: "test", latitude: 44.040561, longitude: -71.132496}
// ];


const FloatPage = () => {

  // Set and update variable for real time river data
  const [dataStreams, setDataStreams] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
    const result = await getRiverData();
    setDataStreams(result);
    };

    fetchData();
  }, []);


  return (
    <div className='content-container'>
      <h1>Hello, this is the Saco River Page!</h1>
      <p>
        Place holder for where we can record river float trip
        details, entry and exit points, river speed vs float time,
        recommended gear, etc..
      </p>
      Current River Conditions in at Conway, NH Sensor:
        <ul>
          {dataStreams.map((measurement) => 
          <li>
            {measurement[0]}: {measurement[1]}
          </li>
          )}
        </ul>
    </div>
  );
};

export default FloatPage;