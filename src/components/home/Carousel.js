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
      autoplay: false,
      autoplaySpeed: 5000
    };
    return (
      <Slider {...settings}>
        <div>
          <img src="http://biodynamo.web.cern.ch/sites/biodynamo.web.cern.ch/files/tumor_concept.png"></img>
        </div>
        <div>
          <img src="http://biodynamo.web.cern.ch/sites/biodynamo.web.cern.ch/files/cells.png"></img>
        </div>
      </Slider>
    );
  }
}

export default Carousel
