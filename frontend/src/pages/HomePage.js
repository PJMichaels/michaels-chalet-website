import React from 'react';
import ImageSlider from '../components/ImageSlider';
import './HomePage.css';

const HomePage = () => {



  return (
    <div>
      {/* <h1>Hello, this is the Home Page!</h1> */}
      <div className="content-container">
        <ImageSlider />
      </div>
      
    </div>
  );
};

export default HomePage;