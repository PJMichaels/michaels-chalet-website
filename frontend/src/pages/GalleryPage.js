// src/pages/GalleryPage.js
import React from 'react';
import ImageCarousel from '../components/ImageCarousel';

const imagePaths = [
  '../../Photos/gallery/LivingRoom1.jpg',
  '../../Photos/gallery/LivingRoom2.jpg',
  '../../Photos/gallery/Kitchen1.jpg',
  '../../Photos/gallery/KitchenTable1.jpg',
  '../../Photos/gallery/PrimaryBedroom1.jpg',
  '../../Photos/gallery/PrimaryBedroom2.jpg',
  '../../Photos/gallery/MainFloorBath1.jpg',
  '../../Photos/gallery/DownstairsBedroom1.jpg',
  '../../Photos/gallery/DownstairsBedroom2.jpg',
  '../../Photos/gallery/FamilyRoom1.jpg',
  '../../Photos/gallery/FamilyRoom2.jpg',
  '../../Photos/gallery/FamilyRoom3.jpg',
  '../../Photos/gallery/DownStairsBath1.jpg',
  '../../Photos/gallery/Office1.jpg',
  '../../Photos/gallery/Office2.jpg',
  '../../Photos/gallery/Office3.jpg',
  '../../Photos/gallery/StreetView1.jpg',
  '../../Photos/gallery/StreetView2.jpg',
  '../../Photos/gallery/Firepit1.jpg',
  '../../Photos/gallery/CranmoreBeach1.jpg',
  '../../Photos/gallery/RiverTubing1.jpg',
  '../../Photos/gallery/RiverTubing2.jpg',
  '../../Photos/gallery/EchoLake.jpg',
  '../../Photos/gallery/CrawfordNotch.jpg',

  // '../../Photos/gallery/LivingRoom1-xmas.jpg',
  // '../../Photos/gallery/MainFloor1-xmas.jpg',
  // '../../Photos/gallery/MainFloor2-xmas.jpg',
];

const GalleryPage = () => {
  return (
    <div className='bg-black bg-opacity-80 p-4 md:p-6 lg:p-8 sm:m-2 lg:m-8 h-[calc(100vh-6rem)] rounded-lg shadow-lg'>
      <ImageCarousel imagePaths={imagePaths} />
    </div>
  );
};

export default GalleryPage;
