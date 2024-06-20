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
    <div className='bg-black bg-opacity-80 p-4 m-8 h-full rounded-lg shadow-lg'>
      <h1 className='text-white text-3xl border-b-2 p-2 m-2'>Beat the Heat - Tubing on the Saco River!</h1>
      <div className='flex m-4'>
        <div className='flex-2'>
          <h1 className='text-white text-lg'>Current River Conditions in at Conway, NH Sensor:</h1>
            <ul className='text-white p-4'>
              {dataStreams.map((measurement) => 
              <li>
                {measurement[0]}: {measurement[1]}
              </li>
              )}
            </ul>
            <br></br>
            <p className='text-white p-4'>
              This page is still under construction. It will ultimately be a tool to
              help plan your float trip based on river conditions and entry/exit points.
          </p>
        </div>
        <div className='flex-4'>
          <img 
            src= '../../Photos/static/saco-river.jpg' 
            alt='Could not load'
            className='rounded-lg'
          >
          </img>
        </div>
      </div>
    </div>
    
  );
};

export default FloatPage;