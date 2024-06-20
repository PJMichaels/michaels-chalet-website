// src/components/ImageCarousel.js
import React from 'react';
import { Carousel } from 'react-bootstrap';

const ImageCarousel = ({ imagePaths }) => {
  return (
    <div className="max-w-4xl mx-auto mt-2">
      <Carousel>
        {imagePaths.map((path, index) => (
          <Carousel.Item key={index} className="h-[calc(100vh-10rem)]">
            <div className="flex justify-center items-center  h-full">
              <img
                className="object-contain"
                src={path}
                alt={`Slide ${index}`}
              />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;