import React from 'react';

import './Carousel.css';

import banner from '../../assets/banner_new.jpg';

const carousel = (props) => {

	return (
		<div id="landingCarousel" className="carousel slide" data-ride="carousel">
		  <ol className="carousel-indicators">
		    <li className="plantlane-carousel-indicators active" data-target="#landingCarousel" data-slide-to="0"></li>
		    <li className="plantlane-carousel-indicators" data-target="#landingCarousel" data-slide-to="1"></li>
		    <li className="plantlane-carousel-indicators" data-target="#landingCarousel" data-slide-to="2"></li>
		  </ol>
		  <div className="carousel-inner">
		    <div className="carousel-item active">
		      <img className="plantlane-carousel d-block w-100" src={banner} alt="First slide" />
		    </div>
		    <div className="carousel-item">
		      <img className="plantlane-carousel d-block w-100" src={banner} alt="Second slide" />
		    </div>
		    <div className="carousel-item">
		      <img className="plantlane-carousel d-block w-100" src={banner} alt="Third slide" />
		    </div>
		  </div>
		</div>
	);
}

export default carousel;