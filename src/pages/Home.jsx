import React from 'react';
import Aboutus from '../Components/Aboutus';
import Banner from '../Components/Banner';
import Location from '../Components/Location';
import Promotions from '../Components/Promotions';
import Reviews from '../Components/Reviews';
import Newsletter from '../Components/Newsletter';
import UpcomingEvents from '../Components/UpcomingEvents';
import Support from '../Components/Support';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
           <Aboutus></Aboutus>
           <Location></Location>
           <Promotions></Promotions>
           <UpcomingEvents></UpcomingEvents>
           <Reviews></Reviews>
           <Support></Support>
           <Newsletter></Newsletter>
           
            
        </div>
    );
};

export default Home;