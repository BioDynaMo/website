import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

class Carousel extends React.Component {
  render() {
    var settings = {
      arrows: false,
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: false,
      autoplay: true,
      autoplaySpeed: 4000,
      pauseOnFocus: true
    };
    return (
      <Slider {...settings}>
        <div>
          <img src="/images/tumor_concept.png"></img>
        </div>
        <div>
          <img src="/images/cells.png"></img>
        </div>
      </Slider>
    );
  }
}

export default Carousel
