// Banner.jsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
  };

  return (
    <div className="w-full">
      <Slider {...settings}>
        {/* Slide 1 - Club */}
        <div className="relative h-[70vh]">
          <img
            src="/club.jpg" // replace with your actual path
            alt="Club"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.4),rgba(20,20,20,0.4))] flex items-center justify-center text-center text-white px-4">
            <div>
              <h2 className="text-4xl font-bold mb-2">Welcome to Our Club</h2>
              <p className="text-lg">A space to grow, train, and belong.</p>
            </div>
          </div>
        </div>

        {/* Slide 2 - Courts */}
        <div className="relative h-[70vh]">
          <img
            src="/courts.jpg"
            alt="Courts"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.4),rgba(20,20,20,0.4))]  flex items-center justify-center text-center text-white px-4">
            <div>
              <h2 className="text-4xl font-bold mb-2">Top-Class Courts</h2>
              <p className="text-lg">Train on modern, professional-grade courts.</p>
            </div>
          </div>
        </div>

        {/* Slide 3 - Activities */}
        <div className="relative h-[70vh]">
          <img
            src="/activities.jpg"
            alt="Activities"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.4),rgba(20,20,20,0.4))]  flex items-center justify-center text-center text-white px-4">
            <div>
              <h2 className="text-4xl font-bold mb-2">Engaging Activities</h2>
              <p className="text-lg">From tournaments to fun events — stay active!</p>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Banner;


// import React from 'react';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';

// const Banner = () => {
//   return (
//     <Carousel
//       autoPlay
//       infiniteLoop
//       showThumbs={false}
//       showStatus={false}
//       interval={1000}
      
//       swipeable={true}
//       emulateTouch={true}
//     >
//       <div>
//         <img src="/club.jpg" alt="Image 1" />
       
//       </div>
//       <div>
//         <img src="/courts.jpg" alt="Image 2" />
       
//       </div>
//       <div>
//         <img src="/activities.jpg" alt="Image 3" />
        
//       </div>
//     </Carousel>
//   );
// };

// export default Banner;

