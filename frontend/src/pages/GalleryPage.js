import React from 'react';
import ImageGallery from 'react-image-gallery';
import { images } from '../data/gallery-images';

const GalleryPage = () => {
  return (
    <div className='content-container'>
      <h1>Welcome to the Photo Gallery!</h1>
      <p>
        Place holder for where we can add our favorite
        photos of the house and surrounding area etc..
      </p>
      <div className="image-gallery-wrapper">
        <ImageGallery items={images} />      
        </div>
    </div>
  );
};

export default GalleryPage;