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
      autoplaySpeed: 60000,
      pauseOnFocus: true
    };
    return (
      <Slider {...settings}>
        <div style="text-align:center">
          <iframe width="100%" height="473" src="https://www.youtube.com/embed/Uygv5J1Sr5U" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
        <div style="text-align:center">
          <iframe width="100%" height="473" src="https://www.youtube.com/embed/CvpJZ5Ge5z4" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
        <div style="text-align:center">
          <iframe width="100%" height="473" src="https://www.youtube.com/embed/KN0k11zoBUU" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
      </Slider>
    );
  }
}

export default Carousel
