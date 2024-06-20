// src/pages/CarouselPage.js
import React from 'react';
import ImageCarousel from '../components/ImageCarousel';


const imagePaths = [
  '../../Photos/gallery/KitchenTable1.jpg',
  '../../Photos/gallery/LivingRoom1-xmas.jpg',
  '../../Photos/gallery/MainFloor1-xmas.jpg',
  '../../Photos/gallery/MainFloor2-xmas.jpg',
  '../../Photos/gallery/Kitchen1.jpg',
  '../../Photos/gallery/MainFloorBath1.jpg',
  '../../Photos/gallery/SecondBedroom1.jpg',
  '../../Photos/gallery/SecondBedroom2.jpg',
  '../../Photos/gallery/FamilyRoom1.jpg',
  '../../Photos/gallery/FamilyRoom2.jpg',
  '../../Photos/gallery/DownStairsBath1.jpg',
  '../../Photos/gallery/Office1.jpg',
  '../../Photos/gallery/Office2.jpg',
  '../../Photos/gallery/Office3.jpg'
];

const GalleryPage = () => {
  return (
    <div className='bg-black bg-opacity-80 p-4 m-8 h-[calc(100vh-6rem)] rounded-lg shadow-lg object-contain'>
       {/* <div className="container mx-auto p-4"> */}
        <ImageCarousel imagePaths={imagePaths} />
      {/* </div> */}
    </div>
  );
};

export default GalleryPage;