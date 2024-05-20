import React from 'react';
// import ImageGallery from 'react-image-gallery';
// import { images } from '../data/gallery-images';
import ImageSlider from '../components/ImageSlider';
// import './GalleryPage.css';

const GalleryPage = () => {
  return (
    <div>
      {/* <h1>Hello, this is the Home Page!</h1> */}
      <div className="content-container">
        <ImageSlider />
      </div>
      
    </div>
  );
};

export default GalleryPage;