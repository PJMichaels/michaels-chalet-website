import React from 'react';

const HomePage = () => {
  return (
    <div className='bg-black bg-opacity-80 p-4 m-8 h-full rounded-lg shadow-lg'>
      <div className='flex flex-col md:flex-row'>
        <div className='flex-1'>
          <img 
            src='../../Photos/static/home-page.jpg' 
            alt='Could not load'
            className='rounded-lg w-full h-auto object-cover'
          />
        </div>
        <div className='bg-gray-800 mx-10 border-2 rounded-sm py-4 flex-1'>
          <h1 className='text-white text-3xl text-center'>Welcome to our mountain home!</h1>
          <p className='text-white text-xl p-4'>
            We're excited to share our home with you. Set back against the trees, our home offers a 
            quiet retreat with easy access to all North Conway has to offer.
          </p>
          <p className='text-white text-xl p-4'>
            The house is located minutes from beautiful hikes, lively breweries, and shopping at 
            the outlets. In the winter we are 20 minutes from Attitash and Cranmore Mountains, and
            about 40 minutes from Wildcat and Loon.
          </p>
          <p className='text-white text-xl p-4'>
            This is a two bedroom house with an office that serves as a 3rd bedroom. It can comfortably accommodate
            a group of 8. There are 2 living areas and 2 bathrooms, an open concept kitchen, and plenty of space to relax.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;