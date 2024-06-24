import React, { useState, useEffect } from 'react';
import getRiverData from '../utilities/getRiverData';

const FloatPage = () => {
  // Set and update variable for real time river data
  const [dataStreams, setDataStreams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getRiverData();
      setDataStreams(result);
    };

    fetchData();
  }, []);

  return (
    <div className='bg-black bg-opacity-80 p-4 sm:p-3 md:p-6 lg:p-8 m-8 rounded-lg shadow-lg'>
      <h1 className='text-white lg:text-3xl text-xl border-b-2 p-2 mb-4'>Beat the Heat - Tubing on the Saco River!</h1>
      <div className='flex flex-col lg:flex-row m-4'>
        <div className='flex-1 lg:mr-4'>
          <h1 className='text-white text-lg'>Current River Conditions at Conway, NH Sensor:</h1>
          <ul className='text-white lg:p-4 md:p-4'>
            {dataStreams.map((measurement, index) => (
              <li key={index}>
                {measurement[0]}: {measurement[1]}
              </li>
            ))}
          </ul>
          <p className='text-white lg:p-4 md:p-4 py-4'>
            This page is still under construction. It will ultimately be a tool to
            help plan your float trip based on river conditions and entry/exit points.
          </p>
        </div>
        <div className='flex-1'>
          <img 
            src='../../Photos/static/saco-river.jpg' 
            alt='Could not load'
            className='rounded-lg w-full'
          />
        </div>
      </div>
    </div>
  );
};

export default FloatPage;
