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
      autoplaySpeed: 8000,
      pauseOnFocus: true
    };
    return (
      <Slider {...settings}>
        <div style="text-align:center">
          <iframe width="100%" height="473" src="https://www.youtube.com/embed/MA74wZbhO7w" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div style="text-align:center">
          <iframe width="100%" height="473" src="https://www.youtube.com/embed/jlOk_Y3SUHo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div style="text-align:center">
          <iframe width="100%" height="473" src="https://www.youtube.com/embed/Q9UkpLuLnkU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </Slider>
    );
  }
}

export default Carousel
