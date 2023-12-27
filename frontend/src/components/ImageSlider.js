import React, { Component } from 'react';
import './ImageSlider.css';


class ImageSlider extends Component {

  state = { currentImageIndex: 0 };

  images = [
    // '../../LivingRoom1.jpg',
    '../../Photos/KitchenTable1.jpg',
    '../../Photos/LivingRoom1-xmas.jpg',
    '../../Photos/MainFloor1-xmas.jpg',
    '../../Photos/MainFloor2-xmas.jpg',
    '../../Photos/Kitchen1.jpg',
    '../../Photos/MainFloorBath1.jpg',
    '../../Photos/SecondBedroom1.jpg',
    '../../Photos/SecondBedroom2.jpg',
    '../../Photos/FamilyRoom1.jpg',
    '../../Photos/FamilyRoom2.jpg',
    '../../Photos/DownStairsBath1.jpg',
    '../../Photos/Office1.jpg',
    '../../Photos/Office2.jpg',
    '../../Photos/Office3.jpg'
  ];

  componentDidMount = () => {
    this.interval = setInterval(this.nextImage, 5000); // change image every 3 seconds
  }

  componentWillUnmount = () => {
    clearInterval(this.interval);
  }

  nextImage = () => {
    this.setState(prevState => ({
      currentImageIndex: (prevState.currentImageIndex + 1) % this.images.length
    }));
  };

  render() {
    return (
      <div className="image-container">
        <img src={this.images[this.state.currentImageIndex]} alt="Slideshow" />
      </div>
    );
  }
}

export default ImageSlider;