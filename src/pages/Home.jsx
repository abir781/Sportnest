import React from 'react';
import Aboutus from '../Components/Aboutus';
import Banner from '../Components/Banner';
import Location from '../Components/Location';
import Promotions from '../Components/Promotions';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
           <Aboutus></Aboutus>
           <Location></Location>
           <Promotions></Promotions>
           
            
        </div>
    );
};

export default Home;