import React, { Component } from 'react';
import './ImageSlider.css';


class ImageSlider extends Component {

  state = { currentImageIndex: 0 };

  images = ['../../ChaletLivingRoom.jpg', '../../ChaletKitchen.jpg'];

  componentDidMount = () => {
    this.interval = setInterval(this.nextImage, 10000); // change image every 3 seconds
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